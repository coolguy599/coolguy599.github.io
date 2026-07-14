const USERNAME = 'coolguy599';
const container = document.getElementById('repo-container');

async function fetchRepos() {
    try {
        const response = await fetch(`https://github.com{USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories from GitHub.');
        }
        
        const repos = await response.json();
        
        if (repos.length === 0) {
            container.innerHTML = '<div class="loading">No public repositories found.</div>';
            return;
        }

        container.innerHTML = '';

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';

            card.innerHTML = `
                <h2 class="repo-title">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                </h2>
                <p class="repo-desc">${repo.description || 'No description provided.'}</p>
                <div class="repo-meta">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

fetchRepos();
