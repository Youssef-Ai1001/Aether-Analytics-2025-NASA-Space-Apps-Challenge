import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UsersIcon, UserIcon, MapPinIcon, HeartIcon, MessageCircleIcon, ShareIcon, SearchIcon, TrendingUpIcon, CalendarIcon, FileTextIcon, ImageIcon, SendIcon, FilterIcon, GlobeIcon, CheckIcon } from 'lucide-react';
import SignupModal from '../components/auth/SignupModal';
// Mock data for community posts
const communityPosts = [{
  id: 1,
  user: {
    name: 'Jennifer Lee',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    location: 'Portland, OR'
  },
  content: "Just installed my new air quality monitor from Air Guard! The setup was super easy and I'm already getting real-time data about my neighborhood. Has anyone compared the readings to the official EPA monitors?",
  images: [],
  timestamp: '2 hours ago',
  likes: 24,
  comments: 7,
  tags: ['AirMonitor', 'CitizenScience']
}, {
  id: 2,
  user: {
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    location: 'Chicago, IL'
  },
  content: "Alert: High PM2.5 levels detected in downtown Chicago today. If you have respiratory issues, consider limiting outdoor activities. I've noticed my asthma symptoms are worse today. Anyone experiencing the same?",
  images: [],
  timestamp: '5 hours ago',
  likes: 42,
  comments: 15,
  tags: ['AirQualityAlert', 'AsthmaAwareness']
}, {
  id: 3,
  user: {
    name: 'Sarah Johnson, PhD',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    location: 'Boston, MA',
    verified: true
  },
  content: 'Just published our new research on the correlation between air quality improvements during the pandemic and reduced respiratory hospital admissions. The data shows a significant drop in asthma-related ER visits during lockdown periods. Check out the full paper in the link below!',
  images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
  timestamp: '1 day ago',
  likes: 156,
  comments: 32,
  tags: ['Research', 'COVID19', 'AirQuality']
}];
// Mock data for trending topics
const trendingTopics = [{
  id: 1,
  name: 'Wildfire Smoke',
  count: 1243
}, {
  id: 2,
  name: 'Air Purifiers',
  count: 856
}, {
  id: 3,
  name: 'Pollen Season',
  count: 712
}, {
  id: 4,
  name: 'NASA TEMPO',
  count: 534
}, {
  id: 5,
  name: 'PM2.5 Monitors',
  count: 489
}];
// Mock data for community events
const communityEvents = [{
  id: 1,
  title: 'Clean Air Community Cleanup',
  date: 'Nov 12, 2023',
  location: 'Central Park, NYC',
  attendees: 45
}, {
  id: 2,
  title: 'Air Quality Monitoring Workshop',
  date: 'Nov 18, 2023',
  location: 'Virtual Event',
  attendees: 123
}, {
  id: 3,
  title: 'Environmental Policy Townhall',
  date: 'Dec 5, 2023',
  location: 'City Hall, Seattle',
  attendees: 78
}];
export const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [postContent, setPostContent] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [isMember, setIsMember] = useState<boolean>(() => {
    try {
      return localStorage.getItem('community_member') === '1';
    } catch {
      return false;
    }
  });
  function handleSignupComplete() {
    try {
      localStorage.setItem('community_member', '1');
    } catch (_) { void 0; }
    setIsMember(true);
    setSignupOpen(false);
  }
  return <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Community <span className="text-neon-cyan">Hub</span>
            </h1>
            <p className="text-text-secondary">
              Connect with air quality advocates and share your experiences
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {!isMember ? (
              <Button variant="primary" size="sm" className="flex items-center space-x-2" onClick={() => setSignupOpen(true)}>
                <UsersIcon className="h-4 w-4" />
                <span>Join Community</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-sm text-neon-green">You are a member</div>
                <Button variant="outline" size="sm" onClick={() => { try { localStorage.removeItem('community_member'); } catch (_) { void 0; } setIsMember(false); }}>Logout</Button>
              </div>
            )}
          </div>
        </div>

        {/* Community Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neon-cyan/20 pb-2">
          <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'feed' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveTab('feed')}>
            Community Feed
          </button>
          <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'discussions' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveTab('discussions')}>
            Discussions
          </button>
          <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'groups' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveTab('groups')}>
            Local Groups
          </button>
          <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'events' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveTab('events')}>
            Events
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="order-2 lg:order-1 lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="p-6 border border-neon-cyan/30">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-background-light/30 flex items-center justify-center border-2 border-neon-cyan">
                  <UserIcon className="h-8 w-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Welcome!
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Join our community to participate
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col space-y-3">
                {!isMember ? (
                  <>
                    <Button variant="primary" className="flex items-center justify-center" onClick={() => setSignupOpen(true)}>
                      <UserIcon className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center" onClick={() => setSignupOpen(true)}>
                      Already a member? Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-text-secondary text-sm text-center">Welcome back to the Community Hub.</div>
                    <a href="/dashboard" className="block">
                      <Button variant="outline" className="w-full">Go to Dashboard</Button>
                    </a>
                    <Button variant="ghost" className="w-full" onClick={() => { try { localStorage.removeItem('community_member'); } catch (_) { void 0; } setIsMember(false); }}>Logout</Button>
                  </>
                )}
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-6 border border-neon-cyan/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Trending Topics
                </h3>
                <TrendingUpIcon className="h-5 w-5 text-neon-cyan" />
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => <div key={topic.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-background-light/20 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-neon-cyan font-medium mr-3">
                        #{index + 1}
                      </span>
                      <span className="text-text-primary">#{topic.name}</span>
                    </div>
                    <span className="text-text-secondary text-sm">
                      {topic.count}
                    </span>
                  </div>)}
              </div>
              <button className="text-neon-cyan text-sm mt-4 hover:underline w-full text-center">
                See More Topics
              </button>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6 border border-neon-cyan/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Upcoming Events
                </h3>
                <CalendarIcon className="h-5 w-5 text-neon-cyan" />
              </div>
              <div className="space-y-4">
                {communityEvents.map(event => <div key={event.id} className="bg-background-light/20 p-3 rounded-lg border border-neon-cyan/10">
                    <h4 className="font-medium text-text-primary text-sm">
                      {event.title}
                    </h4>
                    <div className="flex items-center text-text-secondary text-xs mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-text-secondary text-xs mt-1">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-neon-cyan text-xs">
                        {event.attendees} attending
                      </span>
                      <Button variant="outline" size="sm" className="text-xs py-1 px-2">
                        RSVP
                      </Button>
                    </div>
                  </div>)}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Events
              </Button>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="order-1 lg:order-2 lg:col-span-2 space-y-6">
            {/* Create Post Card */}
            <Card className="p-6 border border-neon-cyan/30">
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-background-light/30 flex items-center justify-center border border-neon-cyan/50">
                  <UserIcon className="h-5 w-5 text-neon-cyan" />
                </div>
                <div className="flex-grow">
                  <textarea className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50 min-h-[100px] resize-none" placeholder="Share your thoughts or questions about air quality..." value={postContent} onChange={e => setPostContent(e.target.value)}></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full hover:bg-background-light/30 transition-colors">
                        <ImageIcon className="h-5 w-5 text-neon-cyan" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-background-light/30 transition-colors">
                        <FileTextIcon className="h-5 w-5 text-neon-cyan" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-background-light/30 transition-colors">
                        <MapPinIcon className="h-5 w-5 text-neon-cyan" />
                      </button>
                    </div>
                    <Button variant="primary" disabled={!postContent.trim()} className="flex items-center space-x-2">
                      <SendIcon className="h-4 w-4" />
                      <span>Post</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Filter Bar */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FilterIcon className="h-4 w-4 text-neon-cyan" />
                <span className="text-text-secondary text-sm">Filter by:</span>
                <select className="bg-background-light/30 border border-neon-cyan/30 rounded-md text-text-primary text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-neon-cyan">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                  <option>My Location</option>
                </select>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <input type="text" placeholder="Search posts..." className="pl-8 pr-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50 text-sm w-40 md:w-auto" />
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {communityPosts.map(post => <Card key={post.id} className="p-6 border border-neon-cyan/30">
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover mr-3 border border-neon-cyan/50" />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-text-primary">
                            {post.user.name}
                          </h4>
                          {post.user.verified && <div className="ml-1 bg-neon-cyan rounded-full p-0.5" title="Verified Expert">
                              <CheckIcon className="h-3 w-3 text-background-dark" />
                            </div>}
                        </div>
                        <div className="flex items-center text-text-secondary text-xs">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          <span>{post.user.location}</span>
                          <span className="mx-1">•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-text-secondary hover:text-neon-cyan">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-text-primary mb-4">{post.content}</p>
                    {post.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => <span key={tag} className="text-neon-cyan text-xs bg-neon-cyan/10 px-2 py-1 rounded-full hover:bg-neon-cyan/20 cursor-pointer transition-colors">
                            #{tag}
                          </span>)}
                      </div>}
                    {post.images.length > 0 && <div className="rounded-lg overflow-hidden mb-4">
                        <img src={post.images[0]} alt="Post attachment" className="w-full h-auto" />
                      </div>}
                  </div>

                  {/* Post Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-neon-cyan/20">
                    <button className="flex items-center text-text-secondary hover:text-neon-cyan transition-colors">
                      <HeartIcon className="h-5 w-5 mr-1" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center text-text-secondary hover:text-neon-cyan transition-colors">
                      <MessageCircleIcon className="h-5 w-5 mr-1" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center text-text-secondary hover:text-neon-cyan transition-colors">
                      <ShareIcon className="h-5 w-5 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                </Card>)}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">Load More Posts</Button>
            </div>
          </div>
        </div>
      </div>

      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} onComplete={handleSignupComplete} />
      {/* Community Stats Banner */}
      <div className="bg-background-darker border-t border-neon-cyan/20 py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            Join Our Growing <span className="text-neon-cyan">Community</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan mb-2">
                15.3K
              </div>
              <p className="text-text-secondary text-sm">Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">
                8.7K
              </div>
              <p className="text-text-secondary text-sm">Sensors Deployed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan mb-2">250+</div>
              <p className="text-text-secondary text-sm">Local Groups</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">42</div>
              <p className="text-text-secondary text-sm">
                Countries Represented
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="primary" size="lg" glow className="flex items-center mx-auto">
              <GlobeIcon className="h-5 w-5 mr-2" />
              Join the Movement
            </Button>
          </div>
        </div>
      </div>
    </div>;
};