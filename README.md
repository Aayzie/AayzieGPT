# AayzieGPT
scuffed LLM front-end that uses scale's spellbook API

## Notes

This is unfinished. Will update this more soon (maybe), but right now it should be at least functional.

## How to use

### Setting up Scale

1) If you don't have one yet, create a Scale account here: https://spellbook.scale.com/. This is where you'll get the GPT-4 API keys.

2) Then, click **Create a New App**. Write whatever Name and Description you want.

3) Pick **GPT-4** as your **model**. Then, set the **Maximum Tokens** to somewhere like **7200**. Don't max it out or you will get errors. Then, erase everything in the **User** block and add one single **{{text}}**. Your prompt should look like this:

![Prompt](https://user-images.githubusercontent.com/16715946/226550010-4933f280-3b7a-44c1-a351-a1bbfbbe545c.jpg)

4) Click **Save New Variant**.

5) Click **Deploy**.

6) You now have your Scale.AI API credentials, which are: **URL** and **API Key**. We will use these two in the next part.

![image](https://user-images.githubusercontent.com/16715946/226726704-448067be-5b1e-4157-a2a5-55ff1211ed45.png)

### Setting up the front-end

1) Install Node.js: https://nodejs.org/

2) Clone the repository, or download the repo as Zip and paste the folder somewhere:
```
git clone https://github.com/Aayzie/AayzieGPT.git
```

3) Create a new file named **.env** in the root of the folder. Add the following and set their values according to your Scale.AI API credentials:
```
SCALE_API_URL=your_scale_api_url
SCALE_API_AUTHORIZATION=Basic your_scale_api_key
```
Replace **your_scale_api_url** and **your_scale_api_key** with the appropriate values. Also, make sure to add **Basic** before your Scale API Key.

Your project folder should look like this:

![image](https://user-images.githubusercontent.com/16715946/226726922-60433839-aceb-47fb-8f41-9f873dd6a6f1.png)

4) Run **setup-server.bat**. You only need to do this once.

5) Run **start-server.bat**. You need to do this every time.

6) Open **index.html**

## Preview

![Screenshot](https://user-images.githubusercontent.com/16715946/226544680-11f8a280-f97a-49c0-b734-c6f2563f9f01.jpg)
