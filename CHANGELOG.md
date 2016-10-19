<a name="1.3.5"></a>
# 1.3.5 (2016-10-19)
* Exporting Tree Component

<a name="1.3.4"></a>
# 1.3.4 (2016-10-18)
* Ignore version

<a name="1.3.3"></a>
# 1.3.3 (2016-10-15)
* Bug fix #73 - check nodes hierarchy before moving node
* Bug fix #71 - added onMoveNode as @Output
* Bug fix #67 - ignoring hidden nodes when navigating the tree using keyboard

<a name="1.3.2"></a>
# 1.3.2 (2016-10-04)
* Fixed bug dragging node to itself

<a name="1.3.0"></a>
# 1.3.0 (2016-10-04)
* Added Drag & Drop functionality using allowDrag option

<a name="1.2.2"></a>
# 1.2.2 (2016-09-24)
* Returning this in all action methods on node to allow chaining
* Fixed Activated / Deactivated events
* Added autoShow to filter
* Added setActiveAndVisible

<a name="1.2.1"></a>
# 1.2.1 (2016-09-21)
* align leaves with siblings that have children

<a name="1.2.0"></a>
# 1.2.0 (2016-09-14)
* rc.7
* support ngModule
* Using ng2 templates instead of passing them in options

<a name="1.1.18"></a>
# 1.1.18 (2016-09-11)
* Added isHidden field
* Added filterNodes function

<a name="1.1.17"></a>
# 1.1.17 (2016-09-10)
* Unused version - please use 1.1.18

<a name="1.1.16"></a>
# 1.1.16 (2016-08-15)
* Handling empty nodes
* Rename onToggle to onToggleExpanded
* Added onEvent
* Not trigerring key actions when input is focused
* Removed shift, ctrl and alt from action mappings

<a name="1.1.15"></a>
# 1.1.15 (2016-08-14)
* Fixed expander not turning on expand

<a name="1.1.14"></a>
# 1.1.14 (2016-08-11)
* Widen expander click area (#24)
* Not using deprecated methods (#24)
* Fixed bug when running update() after async children were loaded
* Setting focus on tree on all mouse actions

<a name="1.1.13"></a>
# 1.1.13 (2016-08-06)
* Added action mappings (#19)
* Moved typings to dependency (#13)

<a name="1.1.12"></a>
# 1.1.12 (2016-08-06)
* Fixed update() re-expanding nodes marked with isExpanded field

<a name="1.1.11"></a>
# 1.1.11 (2016-08-06)
* Added update() method to allow changing tree structure (add / remove nodes)

<a name="1.1.10"></a>
# 1.1.10 (2016-07-17)
* Added context to options, to use in custom template component

<a name="1.1.9"></a>
# 1.1.9 (2016-07-13)
* Fixed IE support
* Supporting 'expanded' field on node for pre-expanded nodes

<a name="1.1.8"></a>
# 1.1.8 (2016-06-30)
* Using View Encapsulation = None to allow override of CSS
* Update to Angular2 Rc3

<a name="1.1.7"></a>
# unpublished version

<a name="1.1.6"></a>
# 1.1.6 (2016-06-18)
* Fixed key navigation bug
* Update to Angular2 Rc2

<a name="1.1.5"></a>
# 1.1.5 (2016-06-17)
* Fixed loading with SystemJS & webpack
