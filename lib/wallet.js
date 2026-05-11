export function getProvider() {
  if (typeof window === 'undefined') return null;
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) return provider;
  }
  return null;
}

export async function connectWallet() {
  const provider = getProvider();
  if (!provider) {
    window.open('https://phantom.app/', '_blank');
    throw new Error('Phantom not installed');
  }
  const response = await provider.connect();
  return response.publicKey.toString();
}

export async function disconnectWallet() {
  const provider = getProvider();
  if (provider) await provider.disconnect();
}

export function getWalletAddress() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('aurelia_wallet') || null;
}

export function saveWalletAddress(address) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('aurelia_wallet', address);
}

export function clearWalletAddress() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('aurelia_wallet');
}
