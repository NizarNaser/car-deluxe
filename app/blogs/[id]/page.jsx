import React, { Suspense } from 'react';
import Image from 'next/image';
import styles from './carDetails.module.css';
import Rating from '@/lib/models/Rating';
import Comments from '@/lib/models/Comment';

export async function generateMetadata(props) {
  const id = props?.params?.id;

  if (!id) {
    return {
      title: "Car Details | AUTO-DELUXE",
      description: "Explore car specifications and ratings.",
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/cars?id=${id}`, {
      next: { revalidate: 60 },
    });
    const car = await res.json();

    return {
      title: car?.name || "Car Details | AUTO-DELUXE",
      description: (car?.description?.replace(/<[^>]+>/g, '') || '').slice(0, 160),
      openGraph: {
        title: car?.name || "Car Details",
        description: (car?.description?.replace(/<[^>]+>/g, '') || '').slice(0, 160),
        images: [car.image || (car.images && car.images[0]) || '/default.jpg'],
      },
    };
  } catch (error) {
    return {
      title: "Car Details | AUTO-DELUXE",
      description: "Explore car specifications and ratings.",
    };
  }
}


async function getSingleCar(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/cars?id=${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function CarDetails({ params }) {
  const data = await getSingleCar(params.id);
  const rating = 4;
  const comments = [
    {
      id: 1,
      author: 'John Doe',
      content: 'Great car! Highly recommend it.',
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.name,
            description: data.description?.replace(/<[^>]+>/g, ''),
            image: [data.image, ...(data.images || [])].filter(Boolean),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: rating,
              reviewCount: comments.length,
            },
          }),
        }}
      />

      <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] m-auto text-center'>
        {data?.name} | AUTO-DELUXE
      </h1>

      <div className='flex justify-center items-center my-4'>
        <Rating value={rating} />
        <span className='ml-2 text-gray-600'>{rating} / 5</span>
      </div>

      <div className={styles.imageGallery}>
        <div className={styles.mainImage}>
          <Image
            src={data.image}
            alt={`Image of ${data.name}`}
            layout="responsive"
            width={800}
            height={600}
            className='rounded-lg shadow-lg'
          />
        </div>
        <div className={styles.thumbnailContainer}>
          {data.images?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1} of ${data.name}`}
              width={100}
              height={75}
              className='rounded-md cursor-pointer hover:scale-105 transition'
            />
          ))}
        </div>
      </div>

      <div className='mt-6 text-lg leading-relaxed max-w-3xl mx-auto text-gray-800'>
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

      <div className='mt-10'>
        <Suspense fallback={<div>Loading comments...</div>}>
          <Comments carId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
