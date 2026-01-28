"use client";

import { useBlogBySlug } from "@/hooks/use-blog";
import { Loader2, Calendar, Clock, User, Eye, ArrowLeft, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const { blog, relatedBlogs, isLoading } = useBlogBySlug(slug);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fefaf6]">
        <Loader2 className="w-8 h-8 text-[#f58420] animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#fefaf6]">
        <h1 className="text-3xl font-bold text-[#014a74] mb-4">Blog Post Not Found</h1>
        <Button onClick={() => router.push("/blog")} className="bg-[#014a74]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-[#fefaf6] pt-16">
      {/* Breadcrumb & Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#014a74] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#014a74] transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#014a74] font-medium line-clamp-1">{blog.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Featured Image */}
      <div className="relative bg-white">
        <div className="container mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/blog")}
              className="text-[#014a74] hover:bg-[#014a74] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>

          {/* Category Badge */}
          <Badge className="bg-[#f58420] text-white mb-4 block w-fit">
            {blog.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#014a74] mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#f58420]" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#f58420]" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f58420]" />
              {blog.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#f58420]" />
              {blog.views} views
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Share Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-[#014a74] text-[#014a74] hover:bg-[#014a74] hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Excerpt */}
              <div className="mb-8 p-6 bg-[#014a74]/5 border-l-4 border-[#f58420] rounded-r-lg">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              {/* Blog Content */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-[#014a74] 
                  prose-headings:font-bold
                  prose-h2:text-3xl
                  prose-h2:mt-12
                  prose-h2:mb-6
                  prose-h3:text-2xl
                  prose-h3:mt-8
                  prose-h3:mb-4
                  prose-p:text-gray-700
                  prose-p:leading-relaxed
                  prose-p:mb-6
                  prose-a:text-[#f58420]
                  prose-a:no-underline
                  prose-a:font-semibold
                  hover:prose-a:underline
                  prose-strong:text-[#014a74]
                  prose-strong:font-bold
                  prose-ul:my-6
                  prose-ol:my-6
                  prose-li:text-gray-700
                  prose-li:mb-2
                  prose-img:rounded-xl
                  prose-img:shadow-lg
                  prose-img:my-8
                  prose-blockquote:border-l-4
                  prose-blockquote:border-[#f58420]
                  prose-blockquote:bg-gray-50
                  prose-blockquote:py-4
                  prose-blockquote:px-6
                  prose-blockquote:italic
                  prose-code:text-[#014a74]
                  prose-code:bg-gray-100
                  prose-code:px-2
                  prose-code:py-1
                  prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Tag className="w-5 h-5 text-[#f58420]" />
                    <h3 className="text-lg font-semibold text-[#014a74]">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#014a74] text-[#014a74] hover:bg-[#014a74] hover:text-white transition-colors cursor-pointer px-4 py-2"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Author Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#014a74] mb-4">About the Author</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-[#014a74] text-lg">{blog.author}</p>
                    <p className="text-sm text-gray-600">Content Writer</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Expert in facade design and construction with years of industry experience.
                  </p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-[#014a74] to-[#014a74]/90 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Article Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Published</span>
                    <span className="font-semibold">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Reading Time</span>
                    <span className="font-semibold">{blog.readTime}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Views</span>
                    <span className="font-semibold">{blog.views}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Category</span>
                    <Badge className="bg-[#f58420] text-white border-0">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-[#f58420] to-[#f58420]/90 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Need Facade Solutions?</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Get expert consultation for your next project
                </p>
                <Button
                  asChild
                  className="w-full bg-white text-[#f58420] hover:bg-gray-100"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#014a74] mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600">Continue exploring our insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog: any) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#f58420] text-white">
                        {relatedBlog.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(relatedBlog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {relatedBlog.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#014a74] group-hover:text-[#f58420] transition-colors line-clamp-2 leading-tight">
                      {relatedBlog.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                      {relatedBlog.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-[#014a74] font-semibold text-sm group-hover:gap-4 transition-all">
                      Read More
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
