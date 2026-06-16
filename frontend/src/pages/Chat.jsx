import { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom'

function Chat() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [config, setConfig] = useState(null)
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const [activeId, setActiveId] = useState(null)
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const saved = localStorage.getItem('aiConfig')
        if (!saved) navigate('/')
        else setConfig(JSON.parse(saved))

        loadConversations()
    }, [])

    const loadConversations = async () => {
        const res = await fetch(`/api/chat/conversations/${userId}`)
        const data = await res.json()
        setConversations(data.conversations)

        if (data.conversations.length > 0) {
            openConversation(data.conversations[0].id)
        } else {
            startNewChat()
        }
    }

    const startNewChat = async () => {
        const res = await fetch('/api/chat/conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, title: 'New Chat' })
        })
        const data = await res.json()
        setActiveId(data.conversationId)
        setMessages([])
        loadConversationList()
    }

    const loadConversationList = async () => {
        const res = await fetch(`/api/chat/conversations/${userId}`)
        const data = await res.json()
        setConversations(data.conversations)
    }

    const openConversation = async (id) => {
        setActiveId(id)
        const res = await fetch(`/api/chat/${id}`)
        const data = await res.json()
        setMessages(data.messages.map(m => ({ role: m.sender, content: m.content })))
    }

    const deleteConversation = async (id, e) => {
        e.stopPropagation()
        if (!confirm('Delete this chat?')) return
        await fetch(`/api/chat/conversation/${id}`, { method: 'DELETE' })
        if (id === activeId) {
            setMessages([])
            setActiveId(null)
        }
        loadConversationList()
    }

    const renameConversation = async (id, e) => {
        e.stopPropagation()
        const newTitle = prompt('New name for this chat:')
        if (!newTitle) return
        await fetch(`/api/chat/conversation/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        })
        loadConversationList()
    }

    const sendMessage = async () => {
        if (!input.trim() || !activeId) return
        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: input,
                vibe: config.vibe,
                language: config.language,
                conversationId: activeId
            })
        })

        const data = await res.json()
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }])
        setLoading(false)
        loadConversationList()
    }

    if (!config) return null

    return (
        <div className="chat-layout">
            <div className="sidebar">
                <button className="new-chat" onClick={startNewChat}>+ New Chat</button>
                {conversations.map(c => (
                    <div
                        key={c.id}
                        className={`conv-item ${c.id === activeId ? 'active' : ''}`}
                        onClick={() => openConversation(c.id)}
                    >
                        <span className="conv-title">{c.title}</span>
                        <span className="conv-actions">
                            <button onClick={(e) => renameConversation(c.id, e)}>✏️</button>
                            <button onClick={(e) => deleteConversation(c.id, e)}>🗑️</button>
                        </span>
                    </div>
                ))}
            </div>

            <div className="chat">
                <div className="chat-header">
                    <button onClick={() => navigate('/')}>← Back</button>
                    <h2>Chatting with {config.aiName} 🤖</h2>
                    <span>{config.vibe} · {config.language}</span>
                </div>

                <div className="messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            <span>{msg.role === 'user' ? config.userName : config.aiName}</span>
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    ))}
                    {loading && <p className="loading">typing...</p>}
                </div>

                <div className="input-area">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat