import {createClient} from '@sanity/client';

const client = createClient({
  // eslint-disable-next-line no-undef
  projectId: '77a0bk80',
  dataset: 'production',
  useCdn: false, // Set to true if you want to use the CDN in production,
  apiVersion:'2021-10-21',
  token:'skeuw3KDJXLEgE8ozGxfQvdOeZaYYycOtwFjBZBg7U1L1DmCkikekjhzk73B9ZAau7b5xBxi42YND9klUP3NjZoW4bHkMQnPBfWpkU699bh5VKWLGMMgYGZA8EQ1Kxsir0banDRYSiUyKua4mGk2PTVhaIsaP611U7fvB7NbbEBoDwCZEaft'
});

export default client;
