const memoryStore = {
  conversations: [],
  ideas: [],
  projects: [],
  codeIssues: [],
  goals: [],
  knowledge: [],
};

export function saveConversation(userMessage, aiResponse) {
  memoryStore.conversations.push({
    id: Date.now(),
    user: userMessage,
    ai: aiResponse,
    createdAt: new Date().toISOString(),
  });
}

export function saveIdea(title, content, tags = []) {
  memoryStore.ideas.push({
    id: Date.now(),
    title,
    content,
    tags,
    createdAt: new Date().toISOString(),
  });
}

export function saveProject(name, description) {
  memoryStore.projects.push({
    id: Date.now(),
    name,
    description,
    createdAt: new Date().toISOString(),
  });
}

export function saveCodeIssue(file, issue) {
  memoryStore.codeIssues.push({
    id: Date.now(),
    file,
    issue,
    createdAt: new Date().toISOString(),
  });
}

export function saveGoal(goal) {
  memoryStore.goals.push({
    id: Date.now(),
    goal,
    completed: false,
    createdAt: new Date().toISOString(),
  });
}

export function saveKnowledge(topic, content) {
  memoryStore.knowledge.push({
    id: Date.now(),
    topic,
    content,
    createdAt: new Date().toISOString(),
  });
}

export function getMemory() {
  return memoryStore;
}

export function searchMemory(keyword) {
  const results = [];

  Object.keys(memoryStore).forEach((section) => {
    memoryStore[section].forEach((item) => {
      const text = JSON.stringify(item).toLowerCase();

      if (text.includes(keyword.toLowerCase())) {
        results.push({
          section,
          item,
        });
      }
    });
  });

  return results;
}

export function getLatestActivity() {
  const allItems = [];

  Object.keys(memoryStore).forEach((section) => {
    memoryStore[section].forEach((item) => {
      allItems.push({
        section,
        ...item,
      });
    });
  });

  return allItems.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
