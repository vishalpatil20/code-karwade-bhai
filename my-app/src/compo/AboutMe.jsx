import React from 'react';
import logo from '../assets/logo.jpg';
import './AboutMe.css'
function About(){
    return(
        <div className='content'>
            <img src={logo} alt="logo" className="name" />
            <span className='info'><span className='ckb'>Code Karwade Bhai</span> uses the ChatGPT API as the foundation for its machine learning capabilities. ChatGPT is a large language model developed by OpenAI, trained on a massive amount of text data to generate human-like responses to natural language inputs. By leveraging the power of the ChatGPT API, <span className='ckb'>Code Karwade Bhai</span> is able to provide intelligent autocompletion suggestions to users as they write code, helping to speed up the coding process and reduce errors. The combination of machine learning and programming expertise makes <span className='ckb'>Code Karwade Bhai</span> an innovative and effective tool for developers of all skill levels.</span>
        </div>

    );
}
export default About;