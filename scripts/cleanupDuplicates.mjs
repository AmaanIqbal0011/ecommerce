import { createClient } from '@sanity/client';

// Configure Sanity client
const client = createClient({
    projectId: 'zowb7op7',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-01-13',
    token: 'skXWko8a11HDPDYyUGZCF7QqRoOGYdbvPj1ylNA6unmSrqEAKnDlQUWY5Bwfnm5VxptygwLa5vamKx7xIVzkX9LRmS3AwsRkrtE8frfk75F9r2YK3Yv2kKrSSfXYgD1jryXFfnhRF9tuWJcEhifbuNTERyrA3pFpU7Cl6tuSH1WoITZZ0h9Y',
  });

/**
 * Clean up duplicate products based on the `title` field.
 */
async function cleanupDuplicates() {
  try {
    // Fetch all products
    const query = `*[_type == "product"]{ _id, title }`;
    const products = await client.fetch(query);

    // Group products by title
    const productsByTitle = products.reduce((acc, product) => {
      if (!acc[product.title]) {
        acc[product.title] = [];
      }
      acc[product.title].push(product);
      return acc;
    }, {});

    // Identify and delete duplicates
    for (const [title, products] of Object.entries(productsByTitle)) {
      if (products.length > 1) {
        console.log(`Found ${products.length} duplicates for title: ${title}`);
        // Keep the first product and delete the rest
        const duplicates = products.slice(1);
        for (const duplicate of duplicates) {
          console.log(`Deleting duplicate with _id: ${duplicate._id}`);
          await client.delete(duplicate._id);
        }
      }
    }

    console.log('Duplicate cleanup completed!');
  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
  }
}

// Run the cleanup function
cleanupDuplicates();