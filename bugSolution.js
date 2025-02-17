// bugSolution.js
export async function getStaticProps({ params }) {
  const { slug } = params;

  // Input validation to ensure slug is valid (e.g., alphanumeric only)
  const isValidSlug = /^[a-zA-Z0-9-]+$/.test(slug);
  if (!isValidSlug) {
    return {
      notFound: true,
    };
  }

  try {
    // Fetch data based on the validated slug
    const res = await fetch(`https://api.example.com/posts/${slug}`);
    const post = await res.json();

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: {
        error: "Failed to fetch post",
      },
    };
  }
}

export default function Post({ post, error }) {
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
