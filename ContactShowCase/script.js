document.addEventListener("DOMContentLoaded", () => {
  // API URL
  const API_URL =
    "https://portfolio-lucky-io1t.onrender.com/api/contact/getcontacts";
  console.log("updated ...");

  // Keep track of all messages and filtered messages
  let allMessages = [];
  let filteredMessages = [];

  // Function to fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Transform the API response to match our expected format
      return data.map((message) => {
        return {
          id: message._id,
          name: message.name,
          email: message.email,
          message: message.message,
          createdAt: message.createdAt,
          // New messages will be determined later by comparing with localStorage
          isNew: false,
        };
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  // Function to determine which messages are new based on localStorage
  const markNewMessages = (messages) => {
    // Get the previously seen message IDs from localStorage
    const previouslySeenIds = JSON.parse(
      localStorage.getItem("seenMessageIds") || "[]"
    );
    const previousCount = parseInt(localStorage.getItem("messageCount") || "0");

    // Current message count
    const currentCount = messages.length;

    // If there are more messages now than before, we have new messages
    const hasNewMessages = currentCount > previousCount;

    if (hasNewMessages) {
      console.log(
        `New messages detected! Previous: ${previousCount}, Current: ${currentCount}`
      );
    }

    // Get all current message IDs
    const currentIds = messages.map((msg) => msg.id);

    // Mark messages as new if they weren't in the previously seen list
    messages.forEach((message) => {
      message.isNew = !previouslySeenIds.includes(message.id);
    });

    // Update localStorage with current message IDs and count
    localStorage.setItem("seenMessageIds", JSON.stringify(currentIds));
    localStorage.setItem("messageCount", currentCount.toString());

    return messages;
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Function to create message card
  const createMessageCard = (message) => {
    const messageCard = document.createElement("div");
    messageCard.className = "message-card";
    messageCard.setAttribute("data-id", message.id);

    // Add new badge if message is new
    if (message.isNew) {
      const newBadge = document.createElement("div");
      newBadge.className = "new-badge";
      newBadge.textContent = "NEW";
      messageCard.appendChild(newBadge);
    }

    const formattedDate = formatDate(message.createdAt);

    messageCard.innerHTML += `
            <div class="message-header">
                <div class="user-info">
                    <div class="user-name">${message.name}</div>
                    <div class="user-email">${message.email}</div>
                </div>
                <div class="message-date">${formattedDate}</div>
            </div>
            <div class="message-content">${message.message}</div>
        `;

    return messageCard;
  };

  // Function to update total messages counter
  const updateTotalMessages = (count) => {
    const totalMessagesElement = document.getElementById("totalMessages");
    totalMessagesElement.textContent = count;

    // Add animation to highlight the counter change
    totalMessagesElement.classList.add("highlight");
    setTimeout(() => {
      totalMessagesElement.classList.remove("highlight");
    }, 500);
  };

  // Function to display messages
  const displayMessages = (messages) => {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = "";

    // Update total messages counter
    updateTotalMessages(allMessages.length);

    if (messages.length === 0) {
      if (document.getElementById("searchInput").value.trim() !== "") {
        // No search results
        messageContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No messages found matching your search</p>
                    </div>
                `;
      } else {
        // No messages at all
        messageContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No messages yet</p>
                    </div>
                `;
      }
      return;
    }

    [...messages].reverse().forEach((message) => {
      const messageCard = createMessageCard(message);
      messageContainer.appendChild(messageCard);
    });
  };

  // Function to filter messages based on search query
  const filterMessages = (query) => {
    if (!query || query.trim() === "") {
      filteredMessages = [...allMessages];
    } else {
      query = query.toLowerCase();
      filteredMessages = allMessages.filter(
        (message) =>
          message.name.toLowerCase().includes(query) ||
          message.email.toLowerCase().includes(query) ||
          message.message.toLowerCase().includes(query)
      );
    }

    displayMessages(filteredMessages);
  };

  // Function to check for new messages from the API
  const checkForNewMessages = async () => {
    try {
      // Fetch latest messages
      const latestMessages = await fetchMessages();

      // Get previous message count
      const previousCount = parseInt(
        localStorage.getItem("messageCount") || "0"
      );

      // If we have more messages now, there are new ones
      if (latestMessages.length > previousCount) {
        // Mark which messages are new
        const messagesWithNewFlags = markNewMessages(latestMessages);

        // Update our message lists
        allMessages = messagesWithNewFlags;

        // Update filtered messages if no search is active
        const searchInput = document.getElementById("searchInput");
        if (!searchInput.value.trim()) {
          filteredMessages = [...allMessages];
          displayMessages(filteredMessages);
        } else {
          // Re-filter with current search term
          filterMessages(searchInput.value);
        }

        // Play notification sound if there are new messages
        if (messagesWithNewFlags.some((msg) => msg.isNew)) {
          playNotificationSound();
        }
      }
    } catch (error) {
      console.error("Error checking for new messages:", error);
    }
  };

  // Function to play notification sound
  const playNotificationSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3"
    );
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  // Function to set up real-time updates
  const setupRealTimeUpdates = () => {
    // Check for new messages every 30 seconds
    setInterval(checkForNewMessages, 30000);
  };

  // Function to set up search functionality
  const setupSearch = () => {
    const searchInput = document.getElementById("searchInput");

    // Add debounce to prevent too many searches while typing
    let debounceTimeout;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        filterMessages(searchInput.value);
      }, 300);
    });

    // Clear search with Escape key
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        filterMessages("");
      }
    });
  };

  // Initialize
  const init = async () => {
    try {
      // Show loading state
      const messageContainer = document.getElementById("messageContainer");
      messageContainer.innerHTML = `
                <div class="empty-state">
                    <div class="loading-spinner"></div>
                    <p>Loading messages...</p>
                </div>
            `;

      // Fetch messages
      let messages = await fetchMessages();

      // Mark new messages based on localStorage comparison
      messages = markNewMessages(messages);

      // Store all messages
      allMessages = messages;
      filteredMessages = [...allMessages];

      // Display messages
      displayMessages(filteredMessages);

      // Set up search functionality
      setupSearch();

      // Set up real-time updates
      setupRealTimeUpdates();
    } catch (error) {
      console.error("Error fetching messages:", error);
      const messageContainer = document.getElementById("messageContainer");
      messageContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to load messages</p>
                </div>
            `;
    }
  };

  // Start the application
  init();
});
