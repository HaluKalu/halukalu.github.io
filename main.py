import sys
import os

files_in_dir = []
ready_files = []
root = os.path.dirname(os.path.abspath(__file__))


def walk_in_dir(root):
    ans = []
    for path, subdirs, files in os.walk(root):
        if path.__contains__('.git/'):
            continue
        elif path.endswith('.git'):
            continue
        for name in files:
            if not name.endswith('.html'):
                continue
            cur_path = path[len(root):]

            if len(cur_path) > 0:
                ans.append((cur_path[1:], name[:-5]))
    return ans


def prepare_array(arr):
    ans = []  # (name, path, filename, sites/canvas) / (path, filename)
    for path, filenames in arr:
        if path.startswith('sites'):
            edited_path = path[6:]
            if edited_path.__contains__('react'):
                edited_path = edited_path[6:]
            if edited_path.__contains__('/'):
                i = edited_path.index('/')
                edited_path = edited_path[:i]
            ans.append((path, edited_path, filenames, 'sites'))
            continue
        if path.startswith('canvas'):
            edited_path = path[7:]
            ans.append((path, edited_path, filenames, 'canvas'))
            continue
        ans.append((path, filenames))
    return ans


def generate_links(arr):
    ans = []  # (path_name, link_name, link)
    for i in range(0, len(arr)):
        if len(arr[i]) == 4:
            link = arr[i][0] + '/' + arr[i][2] + '.html'
            ans.append((arr[i][3], arr[i][1], link))
        else:
            link = arr[i][0] + '/' + arr[i][1] + '.html'
            ans.append((arr[i][0], arr[i][1], link))
    return ans


'''
<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                aria-expanded="false">Hover</a>
            <div class="dropdown-menu">
                <a class="dropdown-item text-success" href="hover/more.html" target="_blank">"Learn more"</a>
                <a class="dropdown-item text-success" href="hover/lightblob.html" target="_blank">Light blob</a>
                <a class="dropdown-item text-success" href="hover/slice.html" target="_blank">Slice transition</a>
                <a class="dropdown-item text-success" href="hover/cards.html" target="_blank">Price cards</a>
                <a class="dropdown-item text-success" href="hover/simple.html" target="_blank">Simple hover</a>
                <a class="dropdown-item text-success" href="hover/datescard.html" target="_blank">Date cards</a>
            </div>
        </li>
'''


def generate_html(arr):
    ans = ""
    prev = ""
    html = "<li class=\"nav-item dropdown\"><a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\"aria-expanded=\"false\">"
    cur_html = ""
    for path, name, link in arr:
        if path != prev:
            prev = path
            if len(cur_html) > 0:
                cur_html += "</div></li>"
                ans += cur_html
            cur_html = html + path + "</a><div class=\"dropdown-menu\">"
        cur_html += "<a class=\"dropdown-item text-success\" href=\"" + \
            link + "\" target=\"_blank\">" + name + "</a>"
    ans += cur_html + "</div></li>"
    return ans

template_start = "<!doctype html>\
<html lang=\"en\">\
<head>\
    <title>CSS Effects</title>\
    <meta charset=\"utf-8\">\
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\
    <link rel=\"stylesheet\" href=\"bootstrap.min.css\">\
</head>\
<body>\
    <ul class=\"nav nav-tabs\">\
        <li class=\"nav-item\">\
            <a href=\"#\" class=\"nav-link active\">Main</a>\
        </li>"

template_end = "</ul>\
    <div class=\"container-fluid\">\
        <div class=\"text-center\">\
            <p class=\"text h3\">Добро пожаловать!</p>\
        </div>\
    </div>\
    <script src=\"jquery-3.3.1.min.js\"></script>\
    <script src=\"popper.min.js\"></script>\
    <script src=\"bootstrap.min.js\"></script>\
</body>\
</html>"

f = open('index.html', 'w')
f.write(template_start + generate_html(generate_links(prepare_array(walk_in_dir(root)))) + template_end)
f.close()
