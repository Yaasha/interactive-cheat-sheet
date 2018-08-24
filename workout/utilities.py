import re

def url_to_media(url):
    try:
        # youtube
        if 'youtu' in url:
            regex = r"(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^\?&]*)(?:[\?&]t=(?:(\d*)m)?(?:(\d*)s)?)?"
            regex = re.search(regex, url)

            youtube_id = regex.group(1)
            minutes = regex.group(2)
            seconds = regex.group(3)
            
            time = 0
            if minutes != None:
                time += 60 * int(minutes)
            if seconds != None:
                time += int(seconds)

            embed = "https://www.youtube-nocookie.com/embed/" + youtube_id + "?rel=0"
            if time > 0:
                embed += "&amp;start=" + str(time)

            return {'link': embed, 'type': 'youtube'}
        # vimeo
        elif 'vimeo' in url:
            embed = url.replace('https://vimeo.com/', 'https://player.vimeo.com/video/')
            return {'link': embed, 'type': 'vimeo'}
        # image
        elif url.endswith('.jpg') or url.endswith('.png') or url.endswith('.gif'):
            return {'link': url, 'type': 'image'}
        else:
            return {'link': url, 'type': 'link'}
    except:
        return {'link': url, 'type': 'link'}
