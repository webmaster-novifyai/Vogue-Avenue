document.addEventListener('DOMContentLoaded', () => {
    // 1. Structural Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    const cartTrigger = document.getElementById('cart-trigger');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');

    const searchTrigger = document.getElementById('search-trigger-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.getElementById('search-close-btn');

    // 2. Chat Layout Toggles
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.toggle('hidden'); });
        if (chatClose) { chatClose.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.add('hidden'); }); }
        chatWindow.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('click', () => chatWindow.classList.add('hidden'));
    }

    // 3. Cart & Search View Toggles
    if (cartTrigger && cartDrawer) cartTrigger.addEventListener('click', () => cartDrawer.classList.add('active'));
    if (cartCloseBtn && cartDrawer) cartCloseBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (searchTrigger && searchOverlay) searchTrigger.addEventListener('click', () => searchOverlay.classList.add('active'));
    if (searchCloseBtn && searchOverlay) searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));

    // 4. Chat Engine Responses
    function generateSmartBotReply(input) {
        const text = input.toLowerCase();
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return "Good day. Welcome to Vogue Avenue. Are you exploring our women's evening collections or premium men's tailoring today?";
        }
        if (text.includes('size') || text.includes('fit')) {
            return "Our items follow true Italian precision sizing. You can review measurements on our Size Chart link in the header menu.";
        }
        if (text.includes('women') || text.includes('dress')) {
            return "Our Women's Atelier focuses on ultimate refinement. The Silk Satin Evening Gown is currently a collection highlight.";
        }
        if (text.includes('men') || text.includes('suit')) {
            return "Our Men's Tailoring highlights sharp, architectural structures. I highly recommend viewing our Slim-Fit Wool Velvet Tuxedo.";
        }
        return "Thank you for contacting our luxury boutique services. A digital style assistant is reviewing your choices now.";
    }

    function handleUserMessage() {
        if (!chatInput || !chatMessages) return;
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        const userMsg = document.createElement('div');
        userMsg.className = 'message outgoing';
        userMsg.textContent = messageText;
        chatMessages.appendChild(userMsg);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const conciergeReply = document.createElement('div');
            conciergeReply.className = 'message incoming';
            conciergeReply.textContent = generateSmartBotReply(messageText);
            chatMessages.appendChild(conciergeReply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    }

    if (chatSend) chatSend.addEventListener('click', handleUserMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
    }
});
