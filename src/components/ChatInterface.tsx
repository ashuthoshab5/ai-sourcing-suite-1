import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Bot, 
  User, 
  Zap,
  TrendingUp,
  ShoppingCart,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    action: string;
    variant: 'primary' | 'secondary';
  }>;
}

const sampleConversations = {
  'intake-request': [
    {
      id: '1',
      type: 'user' as const,
      content: "I need 15 laptops for our design team with specific performance requirements",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      type: 'assistant' as const,
      content: "I'll analyze this request using our multi-agent decision engine. Let me gather the specifications to optimize supplier selection automatically.",
      timestamp: new Date(Date.now() - 290000)
    },
    {
      id: '3',
      type: 'assistant' as const,
      content: "**Requirement Analysis:**\n\n• Quantity: 15 units confirmed\n• Use case: Design work (high-performance requirements)\n• Budget preference needed\n• Performance specifications required\n• Delivery timeline needed\n\n**AI Agents Activated:**\n✅ Requirement Analysis Agent\n⏳ Supplier Discovery Agent\n⏳ Bid Evaluation Agent",
      timestamp: new Date(Date.now() - 280000),
      suggestions: ['Budget: $2,500 each', 'Need within 3 weeks', 'MacBook Pro preferred', 'High-end graphics required']
    },
    {
      id: '4',
      type: 'user' as const,
      content: "Budget $2,500 each, need within 3 weeks, MacBook Pro preferred with high-end graphics",
      timestamp: new Date(Date.now() - 270000)
    },
    {
      id: '5',
      type: 'assistant' as const,
      content: "**Autonomous Decision Analysis Complete**\n\n**Optimal Solution Identified:**\n• **Primary:** Apple Store Business (12 units) - $2,399 each\n• **Secondary:** B&H Photo (3 units) - $2,449 each\n• **Total Cost:** $36,135 (vs $37,500 single supplier)\n• **Savings:** $1,365 (3.6% optimization)\n• **Delivery:** 18 days (meets 3-week requirement)\n\n**AI Confidence:** 94.2%\n**Decision Status:** Auto-approved (high confidence)\n**Agents Involved:** 5 agents collaborated\n\n✅ Requirements validated\n✅ 12 suppliers evaluated\n✅ Multi-supplier optimization completed\n✅ Risk assessment passed",
      timestamp: new Date(Date.now() - 260000),
      actions: [
        { label: 'Execute Decision', action: 'execute', variant: 'primary' },
        { label: 'Review Details', action: 'review', variant: 'secondary' }
      ]
    }
  ],
  'spend-analytics': [
    {
      id: '1',
      type: 'user' as const,
      content: "Analyze our automated decision performance and show optimization opportunities",
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: '2',
      type: 'assistant' as const,
      content: "I've analyzed our autonomous decision engine performance and identified key optimization patterns. Here's the comprehensive analysis:",
      timestamp: new Date(Date.now() - 590000)
    },
    {
      id: '3',
      type: 'assistant' as const,
      content: "**APDE Performance Analysis:**\n• **Decisions Processed:** 1,247 (↑34% vs Q3)\n• **Automation Rate:** 87.2% (↑15% vs Q3)\n• **Average Confidence:** 92.1% (↑4.2% vs Q3)\n• **Cost Optimization:** $2.8M saved (15.2% improvement)\n\n**🎯 Optimization Opportunities Identified:**\n\n**1. Multi-Supplier Combinations (High Impact)**\n• 67% of decisions used single suppliers\n• **Potential Additional Savings:** $180,000/year\n• **Action:** Increase multi-supplier optimization threshold\n\n**2. Preference Learning Enhancement (Medium Impact)**\n• 23% of manual overrides show preference gaps\n• **Potential Accuracy Gain:** +3.2% decision accuracy\n• **Action:** Deploy enhanced preference learning models\n\n**3. Real-time Market Intelligence (Medium Impact)**\n• 12% of decisions missed better pricing windows\n• **Potential Savings:** $95,000/year\n• **Action:** Integrate dynamic pricing feeds",
      timestamp: new Date(Date.now() - 580000),
      actions: [
        { label: 'Optimize Settings', action: 'optimize', variant: 'primary' },
        { label: 'Detailed Analysis', action: 'analyze', variant: 'secondary' }
      ]
    },
    {
      id: '4',
      type: 'user' as const,
      content: "Show me the multi-supplier optimization opportunity details",
      timestamp: new Date(Date.now() - 570000)
    },
    {
      id: '5',
      type: 'assistant' as const,
      content: "**Multi-Supplier Optimization Analysis**\n\n**Current State:**\n• 67% of decisions use single suppliers (834 decisions)\n• Average single-supplier markup: 8.3%\n• Missed optimization opportunities: $180K annually\n\n**Optimization Strategy:**\n• **Lower Threshold:** Reduce multi-supplier trigger from $50K to $25K\n• **Enhanced Algorithms:** Deploy advanced combinatorial optimization\n• **Supplier Coordination:** Automate multi-supplier logistics\n\n**Implementation Plan:**\n• **Week 1-2:** Update optimization algorithms\n• **Week 3-4:** Deploy enhanced supplier coordination\n• **Week 5-6:** Monitor and fine-tune performance\n\n**Expected Impact:**\n• **Additional Automation:** +23% of decisions\n• **Cost Savings:** $180,000/year\n• **Decision Accuracy:** Maintain 94%+ confidence",
      timestamp: new Date(Date.now() - 560000),
      actions: [
        { label: 'Deploy Optimization', action: 'deploy', variant: 'primary' },
        { label: 'Simulate Impact', action: 'simulate', variant: 'secondary' }
      ]
    }
  ]
};

export function ChatInterface() {
  const [activeConversation, setActiveConversation] = useState('intake-request');
  const [messages, setMessages] = useState<Message[]>(sampleConversations['intake-request']);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages(sampleConversations[activeConversation as keyof typeof sampleConversations]);
  }, [activeConversation]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your request. Let me process this information and provide you with the best recommendations.",
        "I've analyzed your requirements and found several relevant options. Would you like me to proceed with creating a formal request?",
        "Based on our conversation, I can help streamline this process for you. Let me gather a few more details to ensure accuracy.",
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        actions: [
          { label: 'Proceed', action: 'proceed', variant: 'primary' },
          { label: 'Modify', action: 'modify', variant: 'secondary' }
        ]
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="chat-interface animate-fade-in">
      <div className="chat-header">
        <div className="chat-title">
          <Bot className="chat-icon" />
          <div>
            <h2>Autonomous Decision Engine</h2>
            <p>Intelligent procurement decision automation with multi-agent AI</p>
          </div>
        </div>
        <div className="conversation-tabs">
          <button 
            className={`tab-button ${activeConversation === 'intake-request' ? 'active' : ''}`}
            onClick={() => setActiveConversation('intake-request')}
          >
            <ShoppingCart size={16} />
            Decision Request
          </button>
          <button 
            className={`tab-button ${activeConversation === 'spend-analytics' ? 'active' : ''}`}
            onClick={() => setActiveConversation('spend-analytics')}
          >
            <TrendingUp size={16} />
            Decision Analytics
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'user' ? (
                <User size={20} />
              ) : (
                <Bot size={20} />
              )}
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <div className="message-text">
                  {message.content.split('\n').map((line, index) => (
                    <div key={index}>
                      {line.startsWith('**') && line.endsWith(':**') ? (
                        <strong className="message-heading">{line.slice(2, -2)}</strong>
                      ) : line.startsWith('• ') ? (
                        <div className="message-list-item">{line.slice(2)}</div>
                      ) : line.startsWith('✅ ') || line.startsWith('⏳ ') ? (
                        <div className="message-status-item">{line}</div>
                      ) : line.startsWith('**') && line.includes('**') ? (
                        <div dangerouslySetInnerHTML={{
                          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }} />
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              {message.suggestions && (
                <div className="message-suggestions">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {message.actions && (
                <div className="message-actions">
                  {message.actions.map((action, index) => (
                    <button
                      key={index}
                      className={`btn ${action.variant === 'primary' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message assistant typing">
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="quick-prompts">
          <button className="quick-prompt">
            <Zap size={14} />
            Submit decision request
          </button>
          <button className="quick-prompt">
            <TrendingUp size={14} />
            Show decision analytics
          </button>
          <button className="quick-prompt">
            <FileText size={14} />
            Review confidence scores
          </button>
        </div>
        
        <div className="chat-input">
          <button className="input-action">
            <Paperclip size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your procurement needs for AI analysis..."
            className="chat-text-input"
          />
          <button className="input-action">
            <Mic size={20} />
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .chat-interface {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 120px);
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .chat-header {
          padding: var(--spacing-6);
          border-bottom: 1px solid var(--color-gray-200);
          background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .chat-icon {
          width: 48px;
          height: 48px;
          padding: var(--spacing-3);
          background: var(--color-primary-600);
          color: white;
          border-radius: var(--radius-lg);
        }

        .chat-title h2 {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--color-gray-900);
          margin-bottom: var(--spacing-1);
        }

        .chat-title p {
          color: var(--color-gray-600);
          margin: 0;
        }

        .conversation-tabs {
          display: flex;
          gap: var(--spacing-2);
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-2) var(--spacing-4);
          border: 1px solid var(--color-gray-300);
          background: white;
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-gray-700);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .tab-button:hover {
          border-color: var(--color-primary-300);
          background: var(--color-primary-50);
          color: var(--color-primary-700);
        }

        .tab-button.active {
          border-color: var(--color-primary-500);
          background: var(--color-primary-600);
          color: white;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-6);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .message {
          display: flex;
          gap: var(--spacing-3);
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.user .message-avatar {
          background: var(--color-primary-100);
          color: var(--color-primary-600);
        }

        .message.assistant .message-avatar {
          background: var(--color-secondary-100);
          color: var(--color-secondary-600);
        }

        .message-content {
          flex: 1;
          max-width: 70%;
        }

        .message.user .message-content {
          align-items: flex-end;
        }

        .message-bubble {
          padding: var(--spacing-4);
          border-radius: var(--radius-lg);
          position: relative;
        }

        .message.user .message-bubble {
          background: var(--color-primary-600);
          color: white;
          border-bottom-right-radius: var(--radius-base);
        }

        .message.assistant .message-bubble {
          background: var(--color-gray-100);
          color: var(--color-gray-900);
          border-bottom-left-radius: var(--radius-base);
        }

        .message-text {
          font-size: var(--font-size-base);
          line-height: 1.6;
        }

        .message-heading {
          display: block;
          font-weight: 700;
          margin-bottom: var(--spacing-2);
          color: var(--color-primary-600);
        }

        .message.user .message-heading {
          color: rgba(255, 255, 255, 0.9);
        }

        .message-list-item {
          padding-left: var(--spacing-2);
          margin-bottom: var(--spacing-1);
        }

        .message-status-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-1) 0;
          font-size: var(--font-size-sm);
        }

        .message-timestamp {
          font-size: var(--font-size-xs);
          opacity: 0.7;
          margin-top: var(--spacing-2);
        }

        .message-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-2);
          margin-top: var(--spacing-3);
        }

        .suggestion-chip {
          padding: var(--spacing-1) var(--spacing-3);
          background: var(--color-primary-50);
          color: var(--color-primary-700);
          border: 1px solid var(--color-primary-200);
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .suggestion-chip:hover {
          background: var(--color-primary-100);
          border-color: var(--color-primary-300);
        }

        .message-actions {
          display: flex;
          gap: var(--spacing-2);
          margin-top: var(--spacing-3);
        }

        .typing {
          opacity: 0.7;
        }

        .typing-indicator {
          display: flex;
          gap: var(--spacing-1);
          align-items: center;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: var(--color-gray-500);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .chat-input-area {
          padding: var(--spacing-6);
          border-top: 1px solid var(--color-gray-200);
          background: var(--color-gray-50);
        }

        .quick-prompts {
          display: flex;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-4);
          flex-wrap: wrap;
        }

        .quick-prompt {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          padding: var(--spacing-1) var(--spacing-3);
          background: white;
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .quick-prompt:hover {
          border-color: var(--color-primary-300);
          color: var(--color-primary-600);
          background: var(--color-primary-50);
        }

        .chat-input {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          background: white;
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-lg);
          padding: var(--spacing-3);
        }

        .chat-input:focus-within {
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }

        .input-action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          background: none;
          color: var(--color-gray-500);
          cursor: pointer;
          border-radius: var(--radius-base);
          transition: all var(--transition-fast);
        }

        .input-action:hover {
          background: var(--color-gray-100);
          color: var(--color-gray-700);
        }

        .chat-text-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: var(--font-size-base);
          padding: var(--spacing-2) 0;
          background: transparent;
        }

        .chat-text-input::placeholder {
          color: var(--color-gray-500);
        }

        @media (max-width: 768px) {
          .chat-interface {
            height: calc(100vh - 80px);
          }

          .message-content {
            max-width: 85%;
          }

          .quick-prompts {
            overflow-x: auto;
            flex-wrap: nowrap;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .quick-prompts::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}