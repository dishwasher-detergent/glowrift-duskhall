import type { EquipmentSkill, Hero } from '@interfaces';
import { updateHeroData } from '@helpers/hero';
import { recalculateStats } from '@helpers/hero-stats';
import { updateGamestate } from '@helpers/state-game';

export function addSkillToInventory(item: EquipmentSkill): void {
  updateGamestate((state) => {
    state.inventory.skills = [...state.inventory.skills, item];
    return state;
  });
}

export function removeSkillFromInventory(item: EquipmentSkill): void {
  updateGamestate((state) => {
    state.inventory.skills = state.inventory.skills.filter(
      (i) => i.id !== item.id,
    );
    return state;
  });
}

export function maxSkillsForHero(): number {
  return 3;
}

export function equipSkill(
  hero: Hero,
  item: EquipmentSkill,
  slot: number,
): void {
  const heroSkills = hero.skills;
  const existingItem = heroSkills[slot];
  if (existingItem) {
    unequipSkill(hero, existingItem, slot);
  }

  hero.skills[slot] = item;

  updateHeroData(hero.id, {
    skills: heroSkills,
  });

  removeSkillFromInventory(item);
  recalculateStats(hero.id);
}

export function unequipSkill(
  hero: Hero,
  item: EquipmentSkill,
  slot: number,
): void {
  const heroSkills = hero.skills;
  heroSkills[slot] = undefined;

  updateHeroData(hero.id, {
    skills: heroSkills,
  });

  addSkillToInventory(item);
  recalculateStats(hero.id);
}
