﻿using UnityEngine;
using System.Collections;

public class BasicControl : MonoBehaviour
{

		public Animator animator;
		private float h;
		private float v;
		private float rotateSpeed = 90.0f;
		private float j;
		private bool ground = true;
		private int windedState = 0;
		private int layerCount;

		// Use this for initialization
		void Start ()
		{
				animator = GetComponent<Animator> ();
				layerCount = animator.layerCount;
				for (int i=1; i<layerCount; i++) {
						animator.SetLayerWeight (i, 1);
				}
		}
	
		// Update is called once per frame
		void Update ()
		{			
				if (windedState == 0) {
						h = Input.GetAxis ("Horizontal");
						v = Input.GetAxis ("Vertical");
						j = Input.GetAxis ("Jump");
						if (Input.GetMouseButtonDown (1)) {
								StartCoroutine (processWinded ());
						}
				}
		}

		void FixedUpdate ()
		{
				animator.SetFloat ("VInput", v);
				if (windedState == 0 && ground) {
						transform.Rotate (new Vector3 (0, h * Time.deltaTime * rotateSpeed, 0));
				}
				animator.SetFloat ("HInput", h);
				
				AnimatorStateInfo asi = animator.GetCurrentAnimatorStateInfo (0);

				if (j == 1 && ground) {
						animator.SetTrigger ("Jump");
						ground = false;		

						if (animator.GetInteger("RaceState")==3) {
								rigidbody.AddForce (Vector3.up * 500);
						}
				}

		}

		void OnCollisionEnter (Collision collision)
		{
				ground = true;
		}

		IEnumerator processWinded ()
		{
				if (windedState == 0) {
						windedState = 1;
						animator.SetInteger ("WindedState", 1);
						yield return new WaitForSeconds (Random.Range (3.0f, 5.5f));
						animator.SetInteger ("WindedState", 0);
						windedState = 0;
				}
		}
}
