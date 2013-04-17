/*
 * Voice Lamp application.
 * Copyright (C) 2013  Vittorio Cuculo <me@vcuculo.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

chrome.app.runtime.onLaunched.addListener(function() {
  var w = 500;
  var h = 150;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2); 
  chrome.app.window.create('window.html', {
    width: w,
    height: h,
    left: left,
    top: top,
  });
});
