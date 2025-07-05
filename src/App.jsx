import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

const RECEIVER = new PublicKey('E4qdbjzM45hfXfqncuqwmxqU1GGJ3qs7TNuci7iSNgA5');

export default function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!publicKey || !amount) return;

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: RECEIVER,
        lamports
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      setStatus(`✅ Sent! Tx Signature: ${signature}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Transaction failed');
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#0b0c10', color: 'white', minHeight: '100vh' }}>
      <h1>Charitok (SOL) Presale</h1>
      <WalletMultiButton />
      <br />
      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '10px', marginTop: '1rem', width: '100%' }}
      />
      <button onClick={handleSend} style={{ padding: '10px', marginTop: '1rem', width: '100%' }}>
        Buy Presale
      </button>
      <p>{status}</p>
    </div>
  );
}