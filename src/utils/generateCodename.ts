const codenames = [
  "The Nightingale",
  "The Kraken",
  "The Phoenix",
  "Shadow Blade",
  "Iron Falcon",
  "Stealth Hawk",
];

export function generateCodename() {
  const randomIndex = Math.floor(Math.random() * codenames.length);
  return codenames[randomIndex];
}

