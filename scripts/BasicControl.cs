using UnityEngine;
using System.Collections;

public class BasicControl : MonoBehaviour
{

		public Animator animator;
		private float h;
		private float v;
		private float rotateSpeed = 90.0f;
		private float j;
		private bool ground = true;

		// Use this for initialization
		void Start ()
		{
				animator = GetComponent<Animator> ();
		}
	
		// Update is called once per frame
		void Update ()
		{
				h = Input.GetAxis ("Horizontal");
				v = Input.GetAxis ("Vertical");
				j = Input.GetAxis ("Jump");
		}

		void FixedUpdate ()
		{
				animator.SetFloat ("VInput", v);
				transform.Rotate (new Vector3 (0, h * Time.deltaTime * rotateSpeed, 0));
				animator.SetFloat ("HInput", h);
				processJump ();
		}

		void processJump ()
		{	
				if (j == 1 && ground) {
						animator.SetTrigger ("Jump");
						ground = false;
				}
		}

		void OnCollisionEnter (Collision collision)
		{
				ground = true;
		}
}
