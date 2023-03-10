import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import * as firstPost from "./first-post.mdx";
import * as secondPost from "./second-post.mdx";

function postFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
  };
}

export const loader: LoaderFunction = () => {
  return json([postFromModule(firstPost), postFromModule(secondPost)]);
};

export default function BlogIndex() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="mt-0 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Blog
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Learn what is happening behind the scenes
        </p>

        <div className="space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
          {posts.map((post: any) => (
            <article
              key={post.slug}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link to={post.slug}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                  {post.description}
                </p>
              </div>
              <div className="relative flex h-16 items-center gap-x-4">
                <img
                  src={post.authorimageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <span>
                      <span className="absolute inset-0" />
                      {post.authorname}
                    </span>
                  </p>
                  <p className="text-gray-600">{post.authorrole}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
