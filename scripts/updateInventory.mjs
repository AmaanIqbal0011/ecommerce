// scripts/updateInventory.mjs
import { createClient } from '@sanity/client';

// Configure Sanity client
const client = createClient({
  projectId: 'YOUR_PROJECT_ID', // Find in Sanity dashboard
  dataset: 'production', // Your dataset name
  apiVersion: '2023-05-03', // Use latest API version
  token: 'YOUR_WRITE_TOKEN', // Create in Sanity Manage → API
  useCdn: false, // Disable CDN for writes
});

async function updateInventory() {
  try {
    // 1. Fetch all products
    const products = await client.fetch('*[_type == "product"]');
    
    // 2. Add inventory=100 where missing
    const updates = products.map(product => {
      if (!product.inventory) {
        return client
          .patch(product._id)
          .set({ inventory: 100 })
          .commit();
      }
      return null;
    });

    // 3. Execute updates
    const results = await Promise.all(updates);
    const successfulUpdates = results.filter(r => r !== null);

    console.log(`✅ Updated ${successfulUpdates.length} products`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
updateInventory();