export function getRandomAvatar(gender: 'men' | 'women' = 'men'): string {
  const randomNumber = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
}
