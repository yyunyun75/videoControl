# videoControl
test html5 video features

* View the demo remotely at:
http://xywvideo.appspot.com/

*  Run locally:
 *  Install google appengine
 *  Use ``bower install`` to install the 3rd party js library

*  Features include:
 *  An HTML5 video player that utilizes media fragments
 *  A list of clips to be played in the video player
 *  The first item in the list should be the full video
 *  An interface to add new clips to the list by specifying a name , start time , and end time
 *  The ability to delete clips from the list ( excluding the full video item )
 *  The ability to edit existing clips in the list
 *  The ability to play clips in the video player

* Extra Features:
 *  The ability to automatically jump to the next clip after it finishes, with a 3 second waiting period and appropriate loading animation.
 *  The ability to ‘save’ clips for persistent use. (use firebase)
 *  The ability to add arbitrary ‘tags’ to clips so that they can be filtered by the tag name.