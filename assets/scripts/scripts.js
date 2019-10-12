function timeSince(date) {
	date = new Date(date * 1000);
	var seconds = Math.floor((new Date() - date) / 1000);
	
	var interval = Math.floor(seconds / 31536000);
	if (interval > 1) {
		return interval + " years";
	}
	
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + " months";
	}
	
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + " days";
	}
	
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + " hours";
	}
	
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + " minutes";
	}
	
	return Math.floor(seconds) + " seconds";
}

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

// Load threads
fetch('https://webwide.io/custom/api/threads_fetch.php')
    .then((res) => res.json())
    .then((data) => {
    threads = data['threads'];
    
    document.querySelector('#threads-list').innerHTML = '';
    
	threads.forEach(function(element) {
		if(element['User']['avatar_urls']['m'] == null) {
			avatar = 'https://webwide.io/data/avatars/m/0/2.jpg?1570853040';
		} else {
			avatar = element['User']['avatar_urls']['m'];
		}
		
		document.querySelector('#threads-list').innerHTML += '<a href="https://webwide.io/threads/' + element['thread_id'] + '" target="_blank"><div class="thread"><img src="' + avatar + '" alt="User Avatar"><div><div class="title">' + element['title'] + '</div><div class="meta">' + element['last_post_username'] + ' replied ' + timeSince(element['last_post_date']) + ' ago</div></div></div></a>';
	});
	
    console.log('Threads loaded');
});