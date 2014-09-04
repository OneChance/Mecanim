#pragma strict

internal var animator : Animator; // var to store the animator component
var h : float; // variable to hold user horizontal input, turns
var v : float; // variable to hold user vertical input, forward/backward
var rotSpeed : float  = 90.0; //rotation speed
var j : int; // variable to hold user jump input
var canJump : boolean = true; //flag to control the jumping
var grounded : boolean = true; // flag for in air or on ground 
internal var windedState : int; // need to coordinate with animator
internal var layers : int; // layers in the Animator


function Start () {

	animator = GetComponent(Animator); // assign the Animator component
	layers = animator.layerCount;
	if (layers >= 2) {
	    for (var i : int = 1; i < layers; i++ ) { 
	          animator.SetLayerWeight(i, 1);
	    }
	}	
	
	// assign the Winded State parameter from the animator to windedState
 	windedState = animator.GetInteger ("Winded State");
}

function Update () {

	if (windedState == 2) Input.ResetInputAxes(); // block player input
	
	// Get Input each frame and assign it to the variables
	h = Input.GetAxis("Horizontal");
	v = Input.GetAxis("Vertical");	
	j = Input.GetAxis("Jump");	
	//print (j);
	if (Input.GetAxis("Fire3")== 1) ProcessWinded();
}

function FixedUpdate () {

	var stateInfo : AnimatorStateInfo  = animator.GetCurrentAnimatorStateInfo(0);

   // Set the V Input parameter to the V axis value
   animator.SetFloat ("V Input", v);
   
if (windedState == 0) {  
	// rotate the character according to input and rotation speed
	transform.Rotate (new Vector3(0,h*Time.deltaTime*rotSpeed,0)); 
}

   // Set the Turning parameter to the H axis value
	animator.SetFloat ("Turning", h);  
	
	// Set the jumping parameter to the j value
	//animator.SetInteger ("Jump", j);
	if (stateInfo.IsName("Base Layer.Idle")) {  
	     // Set the jumping parameter to the j value
	     if (canJump && grounded && j ==1 ) rigidbody.AddForce (Vector3.up * 200 );
	     ProcessJump();	
	}
	
} 

  function ProcessJump () {

   // if the player pressed jump and it can jump
   if (j == 1 && canJump == true &&  grounded) {
   		// trigger the jump
   		animator.SetBool ("Jump", true); 
   		//prevent more jumps
   		grounded = false;// a jump is in progress
   		yield;
   		animator.SetBool ("Jump", false);
   		canJump = false; // a jump is in progress
   }
   else if (j == 0) {
   		yield;
   		canJump = true; // reset the jump flag
   }

} 

function OnCollisionEnter(collision : Collision) { 
      
     grounded = true; 
           
}

function ProcessWinded () {

	if (windedState != 0) return; // already being processed
	
	windedState = 1; 
	// trigger the Catch Breath state on
	animator.SetInteger ("Winded State", 1);
	// switch to the active state so it won't keep looping
	yield;// give it a frame
	animator.SetInteger ("Winded State", 2);
	// let it run a random number of seconds
	yield new WaitForSeconds(Random.Range(3.0,5.5));
	// trigger it back to idle/ ready to catch breath		
	animator.SetInteger ("Winded State", 0);
	windedState = 0; //clear winded flag
} 
 