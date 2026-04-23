import { useState, useEffect } from 'react'
import './index.css'

const products = [
  {
    id: 1,
    name: '玄武云主机',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    description: '高性能云服务器，提供弹性计算资源',
    price: '¥299/月起'
  },
  {
    id: 2,
    name: '玄武安全网关',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    description: '企业级网络安全防护解决方案',
    price: '¥5999/月起'
  },
  {
    id: 3,
    name: '玄武数据湖',
    category: 'data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    description: '大规模数据存储与分析平台',
    price: '¥899/月起'
  },
  {
    id: 4,
    name: '玄武AI助手',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    description: '智能AI驱动企业数字化转型',
    price: '¥1999/月起'
  },
  {
    id: 5,
    name: '玄武协同办公',
    category: 'office',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    description: '高效团队协作与项目管理工具',
    price: '¥99/月起'
  },
  {
    id: 6,
    name: '玄武物联网平台',
    category: 'iot',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    description: '连接万物，构建智能物联网生态',
    price: '¥1299/月起'
  },
]

const categories = [
  { id: 'all', name: '全部产品' },
  { id: 'cloud', name: '云计算' },
  { id: 'security', name: '安全服务' },
  { id: 'ai', name: 'AI智能' },
  { id: 'office', name: '协同办公' },
  { id: 'data', name: '大数据' },
  { id: 'iot', name: '物联网' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('感谢您的留言，我们会尽快与您联系！')
    setFormData({ name: '', phone: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-xuanwu-darker">
      {/* 导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-xuanwu-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-xuanwu-accent to-yellow-200 flex items-center justify-center">
                <span className="text-xuanwu-darker font-bold text-lg">玄</span>
              </div>
              <span className="text-xl font-serif text-xuanwu-accent">玄武科技</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-xuanwu-text hover:text-xuanwu-accent transition-colors">首页</a>
              <a href="#about" className="text-xuanwu-text hover:text-xuanwu-accent transition-colors">关于我们</a>
              <a href="#products" className="text-xuanwu-text hover:text-xuanwu-accent transition-colors">产品中心</a>
              <a href="#contact" className="text-xuanwu-text hover:text-xuanwu-accent transition-colors">联系我们</a>
            </div>
            <a href="https://t.me/xuanwuB" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-xuanwu-accent text-xuanwu-darker font-medium rounded-full hover:bg-yellow-200 transition-colors">
              立即咨询
            </a>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-xuanwu-dark via-xuanwu-darker to-xuanwu-darker"></div>
        
        {/* 装饰元素 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-xuanwu-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* 玄武图案线条 */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
          <path d="M200 400 Q400 200 600 400 T1000 400" stroke="#c9a962" strokeWidth="2" fill="none"/>
          <path d="M200 420 Q400 220 600 420 T1000 420" stroke="#c9a962" strokeWidth="2" fill="none"/>
          <circle cx="600" cy="400" r="150" stroke="#c9a962" strokeWidth="2" fill="none"/>
          <circle cx="600" cy="400" r="200" stroke="#c9a962" strokeWidth="1" fill="none"/>
        </svg>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 inline-block px-4 py-2 bg-xuanwu-accent/20 rounded-full animate-fade-in">
            <span className="text-xuanwu-accent text-sm">企业级解决方案专家</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-slide-up">
            <span className="text-gradient">玄武</span>科技
          </h1>
          <p className="text-xl md:text-2xl text-xuanwu-muted mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            创新 · 信赖 · 共赢
          </p>
          <p className="text-lg text-xuanwu-text/80 mb-12 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            致力于为企业提供安全、稳定、高效的云计算与智能化解决方案，
            助您在数字时代稳健前行。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <a href="#products" className="px-8 py-4 bg-xuanwu-accent text-xuanwu-darker font-semibold rounded-full hover:bg-yellow-200 transition-all hover:scale-105">
              探索产品
            </a>
            <a href="#contact" className="px-8 py-4 border-2 border-xuanwu-accent text-xuanwu-accent font-semibold rounded-full hover:bg-xuanwu-accent hover:text-xuanwu-darker transition-all">
              联系我们
            </a>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-xuanwu-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      {/* 关于我们 */}
      <section id="about" className="py-24 bg-xuanwu-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xuanwu-accent text-sm tracking-widest uppercase">About Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">关于玄武</h2>
            <p className="text-xuanwu-muted max-w-2xl mx-auto">
              玄武科技创立于2015年，是国内领先的云计算与人工智能解决方案提供商
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: '安全可靠', desc: '采用军规级安全标准，保障企业数据安全，连续5年无重大安全事故' },
              { icon: '⚡', title: '高效稳定', desc: '99.99%的服务可用性，毫秒级响应速度，为业务稳定运行保驾护航' },
              { icon: '🌐', title: '全球覆盖', desc: '覆盖全球30+数据中心，支持多地域容灾，确保服务无处不在' },
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-xuanwu-darker rounded-2xl border border-gray-800 hover:border-xuanwu-accent/50 transition-all hover:-translate-y-2">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-xuanwu-accent">{item.title}</h3>
                <p className="text-xuanwu-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 数据展示 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800">
            {[
              { num: '500+', label: '企业客户' },
              { num: '99.99%', label: '服务可用性' },
              { num: '30+', label: '数据中心' },
              { num: '8年', label: '行业深耕' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.num}</div>
                <div className="text-xuanwu-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品展示 */}
      <section id="products" className="py-24 bg-xuanwu-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xuanwu-accent text-sm tracking-widest uppercase">Products</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">产品中心</h2>
            <p className="text-xuanwu-muted max-w-2xl mx-auto">
              丰富的产品线，满足企业数字化转型的多样化需求
            </p>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeCategory === cat.id
                    ? 'bg-xuanwu-accent text-xuanwu-darker font-medium'
                    : 'bg-xuanwu-dark text-xuanwu-text hover:text-xuanwu-accent border border-gray-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 产品网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-xuanwu-dark rounded-2xl overflow-hidden border border-gray-800 hover:border-xuanwu-accent/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-xuanwu-accent/10">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-xuanwu-dark to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-xuanwu-accent transition-colors">{product.name}</h3>
                  <p className="text-xuanwu-muted text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xuanwu-accent font-semibold">{product.price}</span>
                    <button className="px-4 py-2 bg-xuanwu-accent/20 text-xuanwu-accent rounded-lg hover:bg-xuanwu-accent hover:text-xuanwu-darker transition-colors text-sm">
                      了解更多
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section id="contact" className="py-24 bg-xuanwu-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xuanwu-accent text-sm tracking-widest uppercase">Contact</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">联系我们</h2>
            <p className="text-xuanwu-muted max-w-2xl mx-auto">
              无论您有任何问题或需求，我们随时为您服务
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 联系信息 */}
            <div className="space-y-8">
              <div className="p-8 bg-xuanwu-darker rounded-2xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-6 text-xuanwu-accent">联系方式</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-xuanwu-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <div className="text-sm text-xuanwu-muted mb-1">联系电话</div>
                      <div className="text-xuanwu-text">400-888-8888</div>
                      <div className="text-xuanwu-text">010-8888-8888</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-xuanwu-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <div className="text-sm text-xuanwu-muted mb-1">Telegram 商务</div>
                      <div className="flex flex-col gap-1">
                        <a href="https://t.me/vipac0" target="_blank" rel="noopener noreferrer" className="text-xuanwu-text hover:text-xuanwu-accent transition-colors">@vipac0</a>
                        <a href="https://t.me/vipguobao" target="_blank" rel="noopener noreferrer" className="text-xuanwu-text hover:text-xuanwu-accent transition-colors">@vipguobao</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-xuanwu-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🕐</span>
                    </div>
                    <div>
                      <div className="text-sm text-xuanwu-muted mb-1">工作时间</div>
                      <div className="text-xuanwu-text">周一至周五 9:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>

            {/* 联系表单 */}
            <div className="p-8 bg-xuanwu-darker rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-6 text-xuanwu-accent">在线留言</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-xuanwu-muted mb-2">您的姓名</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-xuanwu-dark border border-gray-700 rounded-lg text-xuanwu-text focus:border-xuanwu-accent focus:outline-none transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm text-xuanwu-muted mb-2">联系电话</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-xuanwu-dark border border-gray-700 rounded-lg text-xuanwu-text focus:border-xuanwu-accent focus:outline-none transition-colors"
                    placeholder="请输入您的手机号"
                  />
                </div>
                <div>
                  <label className="block text-sm text-xuanwu-muted mb-2">留言内容</label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-xuanwu-dark border border-gray-700 rounded-lg text-xuanwu-text focus:border-xuanwu-accent focus:outline-none transition-colors resize-none"
                    placeholder="请输入您想咨询的内容..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-xuanwu-accent text-xuanwu-darker font-semibold rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  提交留言
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-xuanwu-darker border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-xuanwu-accent to-yellow-200 flex items-center justify-center">
                  <span className="text-xuanwu-darker font-bold text-lg">玄</span>
                </div>
                <span className="text-xl font-serif text-xuanwu-accent">玄武科技</span>
              </div>
              <p className="text-xuanwu-muted text-sm">
                专业的企业级云计算与人工智能解决方案提供商，为您的数字化转型保驾护航。
              </p>
            </div>
            
            {[
              { title: '产品服务', links: ['云主机', '安全网关', '数据湖', 'AI助手'] },
              { title: '技术支持', links: ['文档中心', 'API文档', '常见问题', '技术博客'] },
              { title: '关于我们', links: ['公司简介', '发展历程', '加入我们', '联系我们'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xuanwu-accent font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-xuanwu-muted hover:text-xuanwu-accent transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-xuanwu-muted text-sm mb-4 md:mb-0">
              © 2024 玄武科技 版权所有 | 京ICP备12345678号
            </p>
            <div className="flex gap-4">
              {['微博', '微信', '知乎'].map((social, i) => (
                <a key={i} href="#" className="text-xuanwu-muted hover:text-xuanwu-accent transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App