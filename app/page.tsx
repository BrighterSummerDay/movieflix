'use client';

import React, { useState, useEffect } from 'react';
import { Search, Play, X, Info, ChevronRight } from 'lucide-react';

/**
 * 影片数据类型定义
 */
interface MediaItem {
  id: number;
  title: string;
  titleEn: string;
  year: number;
  category: 'movie' | 'tv' | 'anime';
  region: string;
  language: string;
  genres: string[];
  rating: number;
  poster: string;
  backdrop: string;
  description: string;
  playerUrl: string;
  duration?: string;
  seasons?: number;
  episodes?: number;
}

/**
 * 模拟数据库 - 实际部署时替换为真实API或数据库
 */
const MOCK_DATABASE: MediaItem[] = [
  {
    id: 1,
    title: '肖申克的救赎',
    titleEn: 'The Shawshank Redemption',
    year: 1994,
    category: 'movie',
    region: '美国',
    language: '英语',
    genres: ['剧情', '犯罪'],
    rating: 9.3,
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    description: '20世纪40年代末，小有成就的青年银行家安迪因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生...',
    playerUrl: 'https://example.com/player/1',
    duration: '142分钟'
  },
  {
    id: 2,
    title: '教父',
    titleEn: 'The Godfather',
    year: 1972,
    category: 'movie',
    region: '美国',
    language: '英语',
    genres: ['剧情', '犯罪'],
    rating: 9.2,
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    description: '40年代的美国，"教父"维托·唐·科莱昂是黑手党科莱昂家族的首领，带领家族从事非法的勾当，但同时他也是许多弱小平民的保护神，深得人们爱戴...',
    playerUrl: 'https://example.com/player/2',
    duration: '175分钟'
  },
  {
    id: 3,
    title: '盗梦空间',
    titleEn: 'Inception',
    year: 2010,
    category: 'movie',
    region: '美国',
    language: '英语',
    genres: ['科幻', '动作', '悬疑'],
    rating: 8.8,
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
    description: '道姆·柯布是一名经验老道的窃贼，他在这一行中算得上是最厉害的，因为他能够潜入人们精神最为脆弱的梦境中，窃取潜意识中有价值的秘密...',
    playerUrl: 'https://example.com/player/3',
    duration: '148分钟'
  },
  {
    id: 4,
    title: '权力的游戏',
    titleEn: 'Game of Thrones',
    year: 2011,
    category: 'tv',
    region: '美国',
    language: '英语',
    genres: ['剧情', '奇幻', '冒险'],
    rating: 9.0,
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop',
    description: '故事从维斯特洛大陆边境处发现远古传说中早已灭绝的生物开始，预示着危险即将到来。而这片大陆的临冬城主暨北境统领艾德史塔克家族也迎来了老友兼国王劳勃·拜拉席恩的来访...',
    playerUrl: 'https://example.com/player/4',
    seasons: 8,
    episodes: 73
  },
  {
    id: 5,
    title: '你的名字',
    titleEn: 'Your Name',
    year: 2016,
    category: 'anime',
    region: '日本',
    language: '日语',
    genres: ['动画', '爱情', '奇幻'],
    rating: 8.4,
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop',
    description: '在远离大都会的小山村，住着巫女世家出身的高中女孩宫水三叶。校园和家庭的原因本就让她充满烦恼，而近一段时间发生的奇怪事件，又让三叶摸不清头脑...',
    playerUrl: 'https://example.com/player/5',
    duration: '106分钟'
  },
  {
    id: 6,
    title: '寄生虫',
    titleEn: 'Parasite',
    year: 2019,
    category: 'movie',
    region: '韩国',
    language: '韩语',
    genres: ['剧情', '惊悚'],
    rating: 8.6,
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&h=1080&fit=crop',
    description: '金基泽一家四口全部无业，住在狭窄且昏暗的半地下室，为了生计而到处寻找工作机会。长子金基宇通过朋友介绍，以假学历来到富豪朴社长家应征家教...',
    playerUrl: 'https://example.com/player/6',
    duration: '132分钟'
  },
  {
    id: 7,
    title: '让子弹飞',
    titleEn: 'Let the Bullets Fly',
    year: 2010,
    category: 'movie',
    region: '中国大陆',
    language: '汉语普通话',
    genres: ['剧情', '喜剧', '动作'],
    rating: 8.8,
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    description: '民国年间，花钱捐得县长的马邦德携妻及随从走马上任。途中遭劫匪张牧之伏击，随从尽死，只夫妻二人侥幸活命。马为保命，谎称自己是县长的汤师爷...',
    playerUrl: 'https://example.com/player/7',
    duration: '132分钟'
  },
  {
    id: 8,
    title: '进击的巨人',
    titleEn: 'Attack on Titan',
    year: 2013,
    category: 'anime',
    region: '日本',
    language: '日语',
    genres: ['动画', '动作', '奇幻'],
    rating: 9.0,
    poster: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920&h=1080&fit=crop',
    description: '107年前，巨人突然出现在世界上，人类几乎被赶尽杀绝。幸存下来的人们建造了三重巨大的城墙，在这隔绝的环境里享受了一百年的和平...',
    playerUrl: 'https://example.com/player/8',
    seasons: 4,
    episodes: 87
  }
];

/**
 * 筛选选项配置
 */
const FILTER_OPTIONS = {
  regions: ['全部', '中国大陆', '美国', '日本', '韩国', '英国', '法国', '其他'],
  languages: ['全部', '汉语普通话', '英语', '日语', '韩语', '法语', '西班牙语', '其他'],
  genres: ['全部', '剧情', '喜剧', '动作', '科幻', '爱情', '惊悚', '犯罪', '奇幻', '冒险', '悬疑', '动画']
};

/**
 * 主应用组件
 */
export default function NetflixStyleSite() {
  // ========== 状态管理 ==========
  const [activeTab, setActiveTab] = useState<'movie' | 'tv' | 'anime'>('movie');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('全部');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('全部');
  const [selectedGenre, setSelectedGenre] = useState<string>('全部');
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<MediaItem | null>(null);

  /**
   * 筛选逻辑 - 当任何筛选条件变化时重新筛选数据
   */
  useEffect(() => {
    let results = MOCK_DATABASE;

    // 1. 按主板块筛选
    results = results.filter(item => item.category === activeTab);

    // 2. 按地区筛选
    if (selectedRegion !== '全部') {
      results = results.filter(item => item.region === selectedRegion);
    }

    // 3. 按语言筛选
    if (selectedLanguage !== '全部') {
      results = results.filter(item => item.language === selectedLanguage);
    }

    // 4. 按类型筛选
    if (selectedGenre !== '全部') {
      results = results.filter(item => item.genres.includes(selectedGenre));
    }

    // 5. 按搜索词筛选
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.titleEn.toLowerCase().includes(term)
      );
    }

    setFilteredItems(results);
  }, [activeTab, selectedRegion, selectedLanguage, selectedGenre, searchTerm]);

  /**
   * 重置所有筛选条件
   */
  const resetFilters = () => {
    setSelectedRegion('全部');
    setSelectedLanguage('全部');
    setSelectedGenre('全部');
    setSearchTerm('');
  };

  /**
   * 切换主板块时重置筛选条件
   */
  const handleTabChange = (tab: 'movie' | 'tv' | 'anime') => {
    setActiveTab(tab);
    resetFilters();
  };

  /**
   * 影片卡片组件
   */
  const MediaCard = ({ item }: { item: MediaItem }) => (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => setSelectedItem(item)}
    >
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-800">
        <img 
          src={item.poster} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <Play className="text-white" size={32} fill="white" />
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-black bg-opacity-80 backdrop-blur-sm px-2 py-1 rounded text-yellow-400 font-bold text-sm">
          ★ {item.rating}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-white font-medium text-sm truncate group-hover:text-red-500 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{item.year}</span>
          <span>•</span>
          <span>{item.region}</span>
        </div>
      </div>
    </div>
  );

  /**
   * 筛选标签组件
   */
  const FilterTag = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  /**
   * 播放器模态框组件
   */
  const PlayerModal = ({ item, onClose }: { item: MediaItem; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-white text-2xl font-bold">{item.title}</h2>
            <p className="text-gray-400 mt-1">{item.titleEn} • {item.year}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
          >
            <X size={28} />
          </button>
        </div>
        
        <div className="aspect-video bg-black flex items-center justify-center">
          <div className="text-center">
            <Play size={80} className="text-red-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">播放器位置</p>
            <p className="text-gray-600 text-sm mt-2 font-mono">
              iframe src=&quot;{item.playerUrl}&quot;
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.genres.map(genre => (
              <span 
                key={genre} 
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
            <div>
              <p className="text-gray-500">评分</p>
              <p className="text-white font-bold text-lg">★ {item.rating}</p>
            </div>
            <div>
              <p className="text-gray-500">地区</p>
              <p className="text-white">{item.region}</p>
            </div>
            <div>
              <p className="text-gray-500">语言</p>
              <p className="text-white">{item.language}</p>
            </div>
            <div>
              <p className="text-gray-500">时长</p>
              <p className="text-white">
                {item.duration || `${item.seasons}季 ${item.episodes}集`}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Info size={18} />
              简介
            </h3>
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * 主渲染
   */
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-[1920px] mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-red-600">MOVIEFLIX</h1>

            <nav className="flex items-center gap-8">
              <button
                onClick={() => handleTabChange('movie')}
                className={`text-lg font-medium transition-colors ${
                  activeTab === 'movie' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                电影
              </button>
              <button
                onClick={() => handleTabChange('tv')}
                className={`text-lg font-medium transition-colors ${
                  activeTab === 'tv' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                电视剧
              </button>
              <button
                onClick={() => handleTabChange('anime')}
                className={`text-lg font-medium transition-colors ${
                  activeTab === 'anime' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                动漫
              </button>
            </nav>

            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索标题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 bg-opacity-80 text-white pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="fixed top-24 left-0 right-0 z-30 bg-black bg-opacity-95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-[1920px] mx-auto px-12 py-4">
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              地区
              <ChevronRight size={14} />
            </h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.regions.map(region => (
                <FilterTag
                  key={region}
                  label={region}
                  active={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              语言
              <ChevronRight size={14} />
            </h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.languages.map(language => (
                <FilterTag
                  key={language}
                  label={language}
                  active={selectedLanguage === language}
                  onClick={() => setSelectedLanguage(language)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              类型
              <ChevronRight size={14} />
            </h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.genres.map(genre => (
                <FilterTag
                  key={genre}
                  label={genre}
                  active={selectedGenre === genre}
                  onClick={() => setSelectedGenre(genre)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="pt-64 px-12 max-w-[1920px] mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            共找到 <span className="text-white font-bold">{filteredItems.length}</span> 个结果
          </p>
          {(selectedRegion !== '全部' || selectedLanguage !== '全部' || selectedGenre !== '全部' || searchTerm) && (
            <button
              onClick={resetFilters}
              className="text-red-600 hover:text-red-500 text-sm font-medium"
            >
              清除筛选
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-32">
            <Search size={64} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-xl">未找到相关内容</p>
            <p className="text-gray-600 text-sm mt-2">请尝试调整筛选条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4 pb-20">
            {filteredItems.map(item => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {selectedItem && (
        <PlayerModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}