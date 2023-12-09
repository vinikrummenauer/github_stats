import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReposProps } from '../types/repos';
import styles from './Repos.module.css';
import { BsStar, BsEye, BsCode } from 'react-icons/bs'; // Importe os ícones desejados

const Repos: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();

  const [repos, setRepos] = useState<ReposProps[]>([]);

  useEffect(() => {
    if (userName) {
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar os repositórios');
          }
          return response.json();
        })
        .then((data: ReposProps[]) => {
          setRepos(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar os repositórios:', error);
        });
    }
  }, [userName]);

  return (
    <div>
      <h1>Explore os repositórios do usuário: {userName}</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className={styles.repoItem}>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.iconBg}>
                  <BsStar />
                </div>
                <span className={styles.value}>{repo.stargazers_count}</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.iconBg}>
                  <BsEye />
                </div>
                <span className={styles.value}>{repo.watchers_count}</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.iconBg}>
                  <BsEye />
                </div>
                <span className={styles.value}>{repo.forks_count}</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.iconBg}>
                  <BsCode />
                </div>
                <span className={styles.value}>Language: {repo.language}</span>
              </div>
            </div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              Ver Repositório
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repos;
