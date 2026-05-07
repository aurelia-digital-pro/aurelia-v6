export function handleCommand(command, memory) {

  const cmd = command.toLowerCase().trim();

  switch (cmd) {

    case "/help":
      return `
AVAILABLE COMMANDS

/help
/memory
/clear
/status
/about
/last
/count
/founder
/time
`;

    case "/memory":
      return `
AURELIA MEMORY

${memory
  .map((m, index) => `${index + 1}. ${m.role}: ${m.content}`)
  .join("\n\n")}
`;

    case "/clear":
      memory.length = 0;

      return `
Memory cleared successfully.
`;

    case "/status":
      return `
AURELIA STATUS

Core: ONLINE
Memory: ACTIVE
Founder Mode: ENABLED
System: STABLE
`;

    case "/about":
      return `
AURELIA AI SYSTEM

Founder: Foued
Version: V6
Mode: Founder Intelligence
Language: Arabic / Tunisian
`;

    case "/last":

      if (memory.length === 0) {
        return "No memory found.";
      }

      return `
LAST MEMORY

${memory[memory.length - 1].content}
`;

    case "/count":
      return `
MEMORY COUNT

${memory.length} entries stored.
`;

    case "/founder":
      return `
FOUNDER PROFILE

Name: Foued
Project: Aurelia
Mission: Build a Digital Intelligence System
`;

    case "/time":
      return `
SYSTEM TIME

${new Date().toLocaleString()}
`;

    default:
      return null;
  }
}
