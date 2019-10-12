// Load stats

fetch('https://webwide.io/custom/api/stats_fetch.php')
    .then((res) => res.json())
    .then((data) => {
    stats = data;
    
    document.querySelector('#members-stat').innerHTML = stats[2];
    document.querySelector('#threads-stat').innerHTML = stats[0];
    document.querySelector('#replies-stat').innerHTML = stats[1];
    
    console.log('Stats loaded');
});