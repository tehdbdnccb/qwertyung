import os
from core.indexer import Indexer
from core.file import ZgFile

class StorageModule:
    def __init__(self, indexer_url, account):
        self.indexer_url = indexer_url
        self.account = account

    def upload_state(self, state_text):
        print("💾 [0G Storage] Preparing compressed state for upload...")
        
        # Write state to temporary file for the ZgFile wrapper
        file_path = "current_agent_state.txt"
        with open(file_path, "w") as f:
            f.write(state_text)
            
        try:
            # Upload using official Storage SDK via Turbo Indexer
            zg_file = ZgFile(file_path)
            indexer = Indexer(self.indexer_url, self.account)
            
            # Pushes to the decentralized storage layer
            root_hash, tx_hash = indexer.upload(zg_file)
            print(f"✅ [0G Storage] State Secured for DA. Merkle Root: {root_hash}")
            return root_hash
        finally:
            # Cleanup local temp file
            if os.path.exists(file_path):
                os.remove(file_path)