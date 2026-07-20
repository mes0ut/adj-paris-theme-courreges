class FeaturedBlog extends HTMLElement {

  constructor(){
    super();
    this.featuredBlogCl = {
      container: 'featured-blog-js',
      article: 'article-single-js',
      articleActive: 'article-single-active-js',
      articleImageWrapper: 'article-image-wrapper-js',
      articleImage: 'article-image-js',
      articleImageVisible: 'article-image-visible-js'
    };

    this.init();
  }

  toggleFirstArticle(articleImages, articles, action) {
    if(!articleImages[0]) return;
    if(action === 'add') {
      articleImages[0].classList.add(this.featuredBlogCl.articleImageVisible);
      articles[0].classList.add(this.featuredBlogCl.articleActive);
    } else if (action === 'remove') {
      articleImages[0].classList.remove(this.featuredBlogCl.articleImageVisible);
      articles[0].classList.remove(this.featuredBlogCl.articleActive);
    }
  }

  disableArticle(articleImages, articles) {
    articleImages.forEach(img => img.classList.remove(this.featuredBlogCl.articleImageVisible));
    articles.forEach(article => article.classList.remove(this.featuredBlogCl.articleActive));
    this.toggleFirstArticle(articleImages, articles, 'add');
  }

  activateArticle(targetEl, articleImages, articles){
    this.toggleFirstArticle(articleImages, articles, 'remove');
    const articleID = targetEl.getAttribute('data-article-id');
    targetEl.classList.add(this.featuredBlogCl.articleActive);
    articleImages.filter(img => img.getAttribute('data-article-id') === articleID).forEach(img => img.classList.add(this.featuredBlogCl.articleImageVisible));
  }

  init(){
    const container = this.querySelector('.' + this.featuredBlogCl.container);
    const imageWrapper = this.querySelector('.' + this.featuredBlogCl.articleImageWrapper);

    if(!imageWrapper) return;

    const articles = [...container.querySelectorAll('.' + this.featuredBlogCl.article)];
    if(articles.length < 1) return;

    const articleImages = [...container.querySelectorAll('.' + this.featuredBlogCl.articleImage)]

    this.toggleFirstArticle(articleImages, articles, 'add');

    articles.forEach(article => article.addEventListener('mouseleave', e => {
      this.disableArticle(articleImages, articles);
    }))

    articles.forEach(article => article.addEventListener('mouseenter', e => {
      this.disableArticle(articleImages, articles);
      this.activateArticle(e.target, articleImages, articles);
    }))
  }
}

customElements.define("featured-blog", FeaturedBlog);
