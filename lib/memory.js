export const memory = { 
  founder: {
    name: "Foued",
    project: "Aurelia",
    personality: "Tunisian Arabic Assistant",
    mode: "Founder Mode",
  },

  conversations: [],
  ideas: [],
  goals: [],
  projects: [],
  codeIssues: [],
  knowledgeVault: [],
  commands: [],
  sessions: [],
  activityLogs: [],
};

function createId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function now() {
  return new Date().toISOString();
}

export function saveConversation(userMessage, aiResponse) {
  memory.conversations.push({
    id: createId(),
    user: userMessage,
    ai: aiResponse,
    createdAt: now(),
  });

  memory.activityLogs.push({
    type: "conversation",
    createdAt: now(),
  });
}

export function saveIdea(title, content, tags = []) {
  memory.ideas.push({
    id: createId(),
    title,
    content,
    tags,
    createdAt: now(),
  });
}

export function saveGoal(goal) {
  memory.goals.push({
    id: createId(),
    goal,
    completed: false,
    createdAt: now(),
  });
}

export function completeGoal(goalId) {
  const goal = memory.goals.find((g) => g.id === goalId);

  if (goal) {
    goal.completed = true;
  }
}

export function saveProject(name, description) {
  memory.projects.push({
    id: createId(),
    name,
    description,
    createdAt: now(),
  });
}

export function saveCodeIssue(file, issue) {
  memory.codeIssues.push({
    id: createId(),
    file,
    issue,
    createdAt: now(),
  });
}

export function saveKnowledge(topic, content) {
  memory.knowledgeVault.push({
    id: createId(),
    topic,
    content,
    createdAt: now(),
  });
}

export function saveCommand(command) {
  memory.commands.push({
    id: createId(),
    command,
    createdAt: now(),
  });
}

export function startSession(sessionName = "Default Session") {
  const session = {
    id: createId(),
    name: sessionName,
    startedAt: now(),
  };

  memory.sessions.push(session);

  return session;
}

export function searchMemory(keyword) {
  const results = [];

  Object.keys(memory).forEach((section) => {
    const value = memory[section];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        const text = JSON.stringify(item).toLowerCase();

        if (text.includes(keyword.toLowerCase())) {
          results.push({
            section,
            item,
          });
        }
      });
    }
  });

  return results;
}

export function getLatestActivities(limit = 10) {
  return memory.activityLogs.slice(-limit).reverse();
}

export function getFounderProfile() {
  return memory.founder;
}

export function updateMode(newMode) {
  memory.founder.mode = newMode;
}

export function getMemoryStats() {
  return {
    conversations: memory.conversations.length,
    ideas: memory.ideas.length,
    goals: memory.goals.length,
    projects: memory.projects.length,
    codeIssues: memory.codeIssues.length,
    knowledgeVault: memory.knowledgeVault.length,
    commands: memory.commands.length,
    sessions: memory.sessions.length,
  };
}

export function exportMemory() {
  return JSON.stringify(memory, null, 2);
}

export function clearConversations() {
  memory.conversations = [];
}

export function getMemory() {
  return memory;
}
