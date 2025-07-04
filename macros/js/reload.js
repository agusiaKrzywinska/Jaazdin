const { dialogUtils, genericUtils } = chrisPremades.utils;

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

const ammo = workflow.actor.items.filter((item) => {
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

if (!ammo || ammo.length === 0) {
  genericUtils.notify("Reload | No ammo found", "warn");
  return;
}

const ammoId = await dialogUtils.selectDialog("Select Ammo", "Reload", {
  label: "Select ammo to use",
  name: "selectedAmmo",
  options: {
    options: ammo.map((item) => {
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

selectedWeapon = workflow.actor.items.get(weaponId);
selectedAmmo = workflow.actor.items.get(ammoId);

const clipSize = selectedWeapon.system.uses.max;
const loadedAmmo = selectedWeapon.system.uses.value;
const unloadedAmmo = selectedAmmo.system.quantity;
if (unloadedAmmo <= 0) {
  genericUtils.notify("Reload | No ammo available to load", "warn");
  return;
}
if (loadedAmmo >= clipSize) {
  genericUtils.notify("Reload | Weapon is already fully loaded", "warn");
  return;
}
const ammoToLoad = Math.min(clipSize - loadedAmmo, unloadedAmmo);
await selectedWeapon.update({
  "system.uses.value": loadedAmmo + ammoToLoad,
});
await selectedAmmo.update({
  "system.quantity": unloadedAmmo - ammoToLoad,
});
await workflow.actor.sheet.render(true);
