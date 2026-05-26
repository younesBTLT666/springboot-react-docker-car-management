import React, { Component } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/voitures`;

function parseIntent(message) {
  const msg = message.toLowerCase().trim();

  if (msg.includes("liste") || msg.includes("toutes") || msg.includes("disponibles") ||
      msg.includes("affiche") || msg.includes("montre") || msg.includes("voir")) {
    return { intent: "LIST_ALL" };
  }

  if ((msg.includes("prix") || msg.includes("moins de") || msg.includes("inférieur") ||
       msg.includes("inferieur") || msg.includes("budget")) &&
      msg.match(/\d+/)) {
    const match = msg.match(/\d+/g);
    const montant = parseInt(match[match.length - 1]);
    return { intent: "FILTER_PRIX", maxPrix: montant };
  }

  const marques = ["bmw", "mercedes", "toyota", "renault", "peugeot", "audi", "honda",
                   "ford", "volkswagen", "vw", "hyundai", "kia", "fiat", "nissan",
                   "opel", "citroen", "citroën", "dacia", "tesla"];
  for (const marque of marques) {
    if (msg.includes(marque)) return { intent: "FILTER_MARQUE", marque };
  }

  const couleurs = ["rouge", "bleu", "blanc", "noir", "gris", "vert", "jaune",
                    "orange", "violet", "marron", "beige", "silver", "argent"];
  for (const couleur of couleurs) {
    if (msg.includes(couleur)) return { intent: "FILTER_COULEUR", couleur };
  }

  const anneeMatch = msg.match(/\b(19|20)\d{2}\b/);
  if (anneeMatch) return { intent: "FILTER_ANNEE", annee: parseInt(anneeMatch[0]) };

  if (msg.includes("ajouter") || msg.includes("ajoute") || msg.includes("nouvelle voiture") ||
      msg.includes("créer") || msg.includes("creer")) {
    return { intent: "ADD_VOITURE" };
  }

  if (msg.includes("combien") || msg.includes("nombre") || msg.includes("count")) {
    return { intent: "COUNT" };
  }

  if (msg.includes("aide") || msg.includes("help") || msg === "?") {
    return { intent: "HELP" };
  }

  return { intent: "UNKNOWN" };
}

function formatVoitures(voitures) {
  if (voitures.length === 0) return "Aucune voiture trouvée.";
  return voitures.map((v, i) =>
    `${i + 1}. ${v.marque} ${v.modele} — ${v.couleur}, ${v.annee}, ${v.prix.toLocaleString()} DH`
  ).join("\n");
}

function getTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

const SUGGESTIONS = [
  { label: "📋 Toutes les voitures", text: "Toutes les voitures" },
  { label: "🚗 BMW",                 text: "Voitures BMW" },
  { label: "💰 Prix < 150000",       text: "Prix inférieur à 150000" },
  { label: "🔴 Rouges",              text: "Voitures rouges" },
  { label: "🔢 Combien ?",           text: "Combien de voitures ?" },
  { label: "❓ Aide",                text: "aide" },
];

export default class AssistantVoiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          from: "bot",
          text: "Bonjour ! Je suis votre assistant voitures 🚗\n\nPosez-moi une question :\n• \"Quelles sont les voitures disponibles ?\"\n• \"Voitures BMW\"\n• \"Prix inférieur à 200000\"\n• \"Voitures rouges\"\n• \"Combien de voitures ?\"",
          time: getTime()
        }
      ],
      input: "",
      loading: false
    };
    this.messagesEndRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  addMessage = (from, text) => {
    this.setState(prev => ({
      messages: [...prev.messages, { from, text, time: getTime() }]
    }));
  };

  sendMessage = async (overrideText) => {
    const userMsg = (overrideText || this.state.input).trim();
    if (!userMsg) return;

    this.setState({ input: "", loading: true });
    this.addMessage("user", userMsg);

    const { intent, marque, couleur, annee, maxPrix } = parseIntent(userMsg);

    // Simulate slight delay for realism
    await new Promise(r => setTimeout(r, 400));

    try {
      switch (intent) {
        case "LIST_ALL": {
          const res = await axios.get(API_URL);
          this.addMessage("bot", `J'ai trouvé ${res.data.length} voiture(s) :\n\n${formatVoitures(res.data)}`);
          break;
        }
        case "COUNT": {
          const res = await axios.get(API_URL);
          this.addMessage("bot", `Il y a actuellement ${res.data.length} voiture(s) dans le système. 🚗`);
          break;
        }
        case "FILTER_MARQUE": {
          const res = await axios.get(API_URL);
          const f = res.data.filter(v => v.marque.toLowerCase().includes(marque));
          this.addMessage("bot", f.length > 0
            ? `Voitures "${marque.toUpperCase()}" (${f.length}) :\n\n${formatVoitures(f)}`
            : `Aucune voiture de marque "${marque.toUpperCase()}" trouvée.`
          );
          break;
        }
        case "FILTER_COULEUR": {
          const res = await axios.get(API_URL);
          const f = res.data.filter(v => v.couleur.toLowerCase().includes(couleur));
          this.addMessage("bot", f.length > 0
            ? `Voitures de couleur "${couleur}" (${f.length}) :\n\n${formatVoitures(f)}`
            : `Aucune voiture de couleur "${couleur}" trouvée.`
          );
          break;
        }
        case "FILTER_ANNEE": {
          const res = await axios.get(API_URL);
          const f = res.data.filter(v => v.annee === annee);
          this.addMessage("bot", f.length > 0
            ? `Voitures de l'année ${annee} (${f.length}) :\n\n${formatVoitures(f)}`
            : `Aucune voiture de l'année ${annee} trouvée.`
          );
          break;
        }
        case "FILTER_PRIX": {
          const res = await axios.get(API_URL);
          const f = res.data.filter(v => v.prix <= maxPrix);
          this.addMessage("bot", f.length > 0
            ? `Voitures ≤ ${maxPrix.toLocaleString()} DH (${f.length}) :\n\n${formatVoitures(f)}`
            : `Aucune voiture avec un prix inférieur à ${maxPrix.toLocaleString()} DH.`
          );
          break;
        }
        case "ADD_VOITURE": {
          this.addMessage("bot", "Pour ajouter une voiture, cliquez sur \"➕ Ajouter\" dans la barre de navigation en haut. 👆");
          break;
        }
        case "HELP": {
          this.addMessage("bot",
            "Voici ce que je peux faire :\n\n" +
            "📋 Lister toutes les voitures\n" +
            "🔍 Chercher par marque (BMW, Toyota...)\n" +
            "🎨 Chercher par couleur (rouge, bleu...)\n" +
            "📅 Chercher par année (2020, 2022...)\n" +
            "💰 Filtrer par prix (prix inférieur à 150000)\n" +
            "🔢 Compter les voitures\n\n" +
            "Posez votre question en français !"
          );
          break;
        }
        default: {
          this.addMessage("bot",
            "Je n'ai pas compris. Essayez :\n" +
            "• \"Liste des voitures\"\n" +
            "• \"Voitures BMW\"\n" +
            "• \"Prix inférieur à 100000\"\n\n" +
            "Tapez \"aide\" pour voir toutes les commandes."
          );
        }
      }
    } catch {
      this.addMessage("bot", "❌ Erreur de connexion au serveur. Vérifiez que le backend est démarré.");
    }

    this.setState({ loading: false });
  };

  render() {
    const { messages, input, loading } = this.state;

    return (
      <div className="page-wrapper" style={{ paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="page-header">
          <h2 className="page-title">🤖 Assistant IA</h2>
          <p className="page-subtitle">Posez vos questions sur les voitures en langage naturel</p>
        </div>

        <div className="chat-wrapper">
          {/* Chat header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-name">Assistant Voitures</div>
                <div className="chat-status">En ligne</div>
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {messages.length - 1} message{messages.length > 2 ? 's' : ''}
            </span>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg-row ${msg.from}`}>
                <div className={`msg-avatar-sm ${msg.from === 'bot' ? 'msg-avatar-bot' : 'msg-avatar-user'}`}>
                  {msg.from === 'bot' ? '🤖' : '👤'}
                </div>
                <div>
                  <div className={`msg-bubble ${msg.from}`}>{msg.text}</div>
                  <div className={`msg-time ${msg.from}`}>{msg.time}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="msg-row bot">
                <div className="msg-avatar-sm msg-avatar-bot">🤖</div>
                <div className="msg-bubble bot">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={this.messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="chat-suggestions">
            {SUGGESTIONS.map(s => (
              <button
                key={s.text}
                className="suggestion-chip"
                onClick={() => this.sendMessage(s.text)}
                disabled={loading}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <form
              className="chat-input-row"
              onSubmit={e => { e.preventDefault(); this.sendMessage(); }}
            >
              <input
                type="text"
                className="chat-input"
                placeholder="Posez votre question..."
                value={input}
                onChange={e => this.setState({ input: e.target.value })}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={loading || !input.trim()}
                title="Envoyer"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
