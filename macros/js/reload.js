const { dialogUtils, genericUtils } = chrisPremades.utils;

const selectedReload = workflow.activity.name.toLowerCase();
// console.log(workflow.activity.name);

const ammoWeapons = workflow.actor.items.filter((item) => {
  if (!item.type === "weapon") {
    return false;
  }
  if (!item.system?.properties) {
    return false;
  }
  if (!item.system.properties.has("amm")) {
    return false;
  }
  if (item.system?.uses?.value === null) {
    return false;
  }
  return true;
});

if (ammoWeapons.length === 0) {
  genericUtils.notify("Reload | No weapons found to reload", "warn");
  return;
}

const weaponId = await dialogUtils.selectDialog("Select Weapon", "Reload", {
  label: "Select a weapon to reload",
  name: "selectedWeapon",
  options: {
    options: ammoWeapons.map((item) => {
      return {
        label: `${item.name} (${item.system.uses.value}/${item.system.uses.max})`,
        value: item._id,
      };
    }),
  },
});

if (!weaponId && weaponId !== 0) {
  genericUtils.notify("Reload | No weapon selected", "warn");
  return;
}

let sources = [];

if (selectedReload === "barrel" || selectedReload === "pump") {
  sources = workflow.actor.items.filter((item) => {
    if (item.type !== "consumable") {
      return false;
    }
    if (item.system?.type?.value !== "ammo") {
      return false;
    }
    if (!item.system?.quantity || item.system.quantity <= 0) {
      return false;
    }
    return true;
  });
} else {
  sources = workflow.actor.items.filter((item) => {
    return item.flags.TftJC?.isAmmoContainer;
  });
}

if (!sources || sources.length === 0) {
  genericUtils.notify("Reload | No ammo found", "warn");
  return;
}
const selectedWeapon = workflow.actor.items.get(weaponId);
const clipSize = selectedWeapon.system.uses.max;
const missingAmmo = selectedWeapon.system.uses.spent;

if (missingAmmo <= 0) {
  genericUtils.notify("Reload | Weapon is already fully loaded", "warn");
  return;
}

const ammoId = await dialogUtils.selectDialog("Reload Source", "Reload", {
  label: "Select ammo to use",
  name: "selectedAmmo",
  options: {
    options: sources.map((item) => {
      return {
        label: `${item.name} (${item.system.quantity})`,
        value: item._id,
      };
    }),
  },
});

if (!ammoId) {
  genericUtils.notify("Reload | No ammo selected", "warn");
  return;
}

const selectedAmmo = workflow.actor.items.get(ammoId);

if (selectedReload === "barrel" || selectedReload === "pump") {
  const unloadedAmmo = selectedAmmo.system.quantity;
  if (unloadedAmmo <= 0) {
    genericUtils.notify("Reload | No ammo available to load", "warn");
    return;
  }

  const ammoToLoad = await dialogUtils.numberDialog("Reload Amount", "Reload", {
    label: "Select amount of ammo to load",
    name: "ammoToLoad",
  });

  console.log("ammoToLoad", ammoToLoad);
  console.log("selectedWeapon", selectedWeapon);

  if (ammoToLoad === null || ammoToLoad <= 0) {
    genericUtils.notify("Reload | Invalid amount selected", "warn");
    return;
  }

  if (ammoToLoad > unloadedAmmo) {
    genericUtils.notify("Reload | Not enough ammo available", "warn");
    return;
  }

  if (ammoToLoad > missingAmmo) {
    genericUtils.notify("Reload | Too much ammo selected", "warn");
    return;
  }

  await selectedWeapon.update({
    "system.uses.spent": missingAmmo - ammoToLoad,
  });
  await selectedAmmo.update({
    "system.quantity": unloadedAmmo - ammoToLoad,
  });
  await workflow.actor.sheet.render(true);
  return genericUtils.notify(
    `Reload | Reloaded ${ammoToLoad} ammo into ${selectedWeapon.name}`,
    "info",
  );
}

const ammoUses = selectedAmmo.system.uses;

console.log("ammoUses", ammoUses);

if (!ammoUses) {
  genericUtils.notify(
    "Reload | Selected ammo does not have uses defined",
    "warn",
  );
  return;
}

const ammoInContainer = ammoUses.max - ammoUses.spent;
if (ammoInContainer <= 0) {
  genericUtils.notify("Reload | Selected ammo is empty", "warn");
  return;
}
const ammoToUse = Math.min(missingAmmo, ammoInContainer, clipSize);
await selectedWeapon.update({
  "system.uses.spent": missingAmmo - ammoToUse,
});
await selectedAmmo.update({
  "system.uses.spent": ammoUses.spent + ammoToUse,
});
await workflow.actor.sheet.render(true);
return genericUtils.notify(
  `Reload | Reloaded ${ammoToUse} ammo into ${selectedWeapon.name}`,
  "info",
);
