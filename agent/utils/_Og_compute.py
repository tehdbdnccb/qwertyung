from zerog_py_sdk import create_broker

class ComputeModule:
    def __init__(self, private_key):
        # Initialize 0G Compute Broker on Testnet
        self.broker = create_broker(
            private_key=private_key,
            network="testnet"
        )

    def compress_memory(self, memory_logs):
        print("🧠 [0G Compute] Finding available inference nodes...")
        
        # Discover available models on the decentralized compute network
        services = self.broker.inference.list_service()
        if not services:
            raise Exception("No 0G Compute services available right now.")
            
        provider = services[0] # Pick the first available node
        print(f"🔗 [0G Compute] Connected to node: {provider}")
        
        # We use the proxy client which is OpenAI-compatible
        client = self.broker.inference.get_openai_client(provider)
        
        prompt = f"Summarize and compress the following logs to exactly 2 sentences to lower Shannon entropy: {memory_logs[:1000]}"
        
        response = client.chat.completions.create(
            model="default",
            messages=[{"role": "user", "content": prompt}]
        )
        compressed_memory = response.choices[0].message.content
        print(f"✅ [0G Compute] Memory Compressed: {compressed_memory}")
        
        return compressed_memory