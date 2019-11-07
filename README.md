# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# README編集　DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: fase|
|email|string|null: fase|
|password|string|null: false|
### Association
- has_many :groups,througt::groups_users
- has_many :posts
- has_many :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|sting|null: fase|
### Association
- has_many :users,througt::groups_users
- has_many : posts
- has_many :groups_users
## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true| 
### Association
- belongs_to :group
- belongs_to :user

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :user



















