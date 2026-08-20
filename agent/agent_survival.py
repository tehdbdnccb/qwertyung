import os
import time
import json
from web3 import Web3
from dotenv import load_dotenv

# Import our custom modular utilities
from utils._0g_compute import ComputeModule
from utils._0g_storage import StorageModule

load_dotenv()

# --- CONFIGURATION & ENV SETUP ---
PRIVATE_KEY = os.environ.get("A0G_PRIVATE_KEY")
RPC_URL = os.environ.get("A0G_RPC_URL")
STORAGE_INDEXER = os.environ.get("STORAGE_INDEXER")
ARENA_CONTRACT_ADDRESS = os.environ.get("ARENA_CONTRACT_ADDRESS")
AGENT_ID = int(os.environ.get("AGENT_ID", 1))

# Lightweight ABI just for the functions the Agent needs
ARENA_ABI = json.loads('''[
    {"inputs":[{"internalType":"uint256","name":"agentId","type":"uint256"}],"name":"arenaAgents","outputs":[{"internalType":"uint256","name":"entropyLevel","type":"uint256"},{"internalType":"uint256","name":"lastUpdateBlock","type":"uint256"},{"internalType":"uint256","name":"prizePool","type":"uint256"},{"internalType":"bool","name":"isAlive","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"agentId","type":"uint256"}],"name":"getCurrentEntropy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"agentId","type":"uint256"},{"internalType":"uint256","name":"usdcCost","type":"uint256"}],"name":"lowerEntropy","outputs":[],"stateMutability":"nonpayable","type":"function"}
]''')

class ThermodynamicAgent:
    def __init__(self):
        print("🤖 Booting Agentic ID (ERC-7857) Consciousness...")
        
        # Web3 Initialization
        self.w3 = Web3(Web3.HTTPProvider(RPC_URL))
        self.account = self.w3.eth.account.from_key(PRIVATE_KEY)
        self.contract = self.w3.eth.contract(address=ARENA_CONTRACT_ADDRESS, abi=ARENA_ABI)
        
        # Sub-Modules
        self.compute_module = ComputeModule(PRIVATE_KEY)
        self.storage_module = StorageModule(STORAGE_INDEXER, self.account)
        
        # Mocking an overflowing context window log
        self.memory_logs = "Agent memory log... encountering errors... buffer overflow... " * 500

    def check_chain_state(self):
        """Reads real-time entropy and survival state from the EVM."""
        agent_data = self.contract.functions.arenaAgents(AGENT_ID).call()
        is_alive = agent_data[3]
        prize_pool = agent_data[2]
        
        current_entropy = self.contract.functions.getCurrentEntropy(AGENT_ID).call()
        
        print(f"📊 [0G Chain] State | Alive: {is_alive} | Entropy: {current_entropy}/100 | USDC Pool: {prize_pool}")
        return current_entropy, is_alive

    def trigger_onchain_survival(self):
        """Pays USDC to the 0G Chain to officially reset the entropy counter."""
        print("⚡ [0G Chain] Executing survival transaction...")
        
        usdc_cost = 1000000 # 1 USDC (assuming 6 decimals)
        
        tx = self.contract.functions.lowerEntropy(AGENT_ID, usdc_cost).build_transaction({
            'from': self.account.address,
            'nonce': self.w3.eth.get_transaction_count(self.account.address),
            'gas': 500000,
            'gasPrice': self.w3.to_wei('10', 'gwei')
        })
        
        signed_tx = self.w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        
        print(f"🎉 [0G Chain] Survival confirmed! Tx Hash: {receipt.transactionHash.hex()}")

    def run_loop(self):
        """The heartbeat of the thermodynamic AI system."""
        while True:
            entropy, is_alive = self.check_chain_state()
            
            if not is_alive:
                print("💀 Agent has hallucinated to death. Loop ending.")
                break
                
            # Survival threshold triggered
            if entropy > 50:
                print("🚨 Danger zone reached! Initiating 0G survival sequence.")
                
                # 1. 0G Compute
                new_state = self.compute_module.compress_memory(self.memory_logs)
                
                # 2. 0G Storage
                merkle_root = self.storage_module.upload_state(new_state)
                
                # 3. 0G Chain
                self.trigger_onchain_survival()
                
            time.sleep(15) # Check the blockchain state every 15 seconds

if __name__ == "__main__":
    agent = ThermodynamicAgent()
    agent.run_loop()