# Stub file to satisfy 0g-storage-sdk's internal imports
# The SDK's core/merkle.py tries to import these functions
try:
    from Crypto.Hash import keccak

    def keccak256_hash(data):
        """Hash data with Keccak-256"""
        k = keccak.new(digest_bits=256)
        k.update(data if isinstance(data, bytes) else data.encode())
        return k.digest()

    def keccak256_hash_combine(hash1, hash2):
        """Combine two hashes with Keccak-256"""
        return keccak256_hash(hash1 + hash2)
except ImportError:
    # Fallback if pycryptodome is not available
    pass
