# DumbStreamingApp

An app to stream your favourite videos

Part of technical assessment,
Please proceed to `trivial_questions` folder to see my solution for question 1 to 4

Setup the App API Server:
1. Go to Server folder
```
cd DumbStreamingAPI
```
2. Copy the `.env_example` file with new name `.env`
```
cp .env_example .env
```
3. Specify the environment accordingly, please edit your password and username, keep the `DB_NAME`, and you can also edit `PORT` (optional) (default: 5000)
4. If you have MySql server installed, please run `initiate_db.sql` script to populate the DB first
```
mysql -u<your-username> -p<your-password> < initiate_db.sql
```
5. Start the API server, now the API server is running on the port you specified before (default: 5000)
```
npm run dev
```
6. Get back to the root folder
```
cd ..
```

Setup the Web App:
1. Go to Web App folder
```
cd DumbStreamApp
```
2. Copy the `.env_example` file with new name `.env`
```
cp .env_example .env
```
3. Specify the environment accordingly, if you edit `PORT` before in the server app, please specify that port in `REACT_APP_API_URL` (default: 5000)
4. Run the Web App
```
npm run start
```
