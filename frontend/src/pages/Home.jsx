import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        userName: '',
        aiName: '',
        vibe: 'chill',
        language: 'English'
    })

    const handleStart = () => {
        localStorage.setItem('aiConfig', JSON.stringify(form))
        navigate('/chat')
    }

    return (
        <div className="home">
            <h1>👋 Meet Your AI Friend</h1>
            <p>Personalize your companion before you start chatting!</p>

            <div className="form">
                <input placeholder="Your name" value={form.userName}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })} />

                <input placeholder="Name your AI friend" value={form.aiName}
                    onChange={(e) => setForm({ ...form, aiName: e.target.value })} />

                <select value={form.vibe} onChange={(e) => setForm({ ...form, vibe: e.target.value })}>
                    <option value="chill">😎 Chill</option>
                    <option value="funny">😂 Funny</option>
                    <option value="supportive">🤗 Supportive</option>
                </select>

                <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
                    <option value="English">🇬🇧 English</option>
                    <option value="Arabic">🇸🇦 Arabic</option>
                </select>

                <button onClick={handleStart}>Start Chatting 🚀</button>
            </div>
        </div>
    )
}

export default Home