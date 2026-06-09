import { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom'

function Chat() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [config, setConfig] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('aiConfig')
        if (!saved) navigate('/')
        else setConfig(JSON.parse(saved))
    }, [])

    const sendMessage = async () => {
        if (!input.trim()) return
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
                language: config.language
            })
        })

        const data = await res.json()
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }])
        setLoading(false)
    }

    if (!config) return null

    return (
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
                        <ReactMarkdown>{msg.content}</ReactMarkdown>                    </div>
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
    )
}

export default Chat