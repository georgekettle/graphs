# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.destroy_all
TaskList.destroy_all
UserTask.destroy_all
User.destroy_all


puts "creating users"
user1 = User.create(email: 'george@gmail.com', password: 'secret')
user2 = User.create(email: 'emma@gmail.com', password: 'secret')
user3 = User.create(email: 'ben@gmail.com', password: 'secret')
puts "finished creating users"

puts "creating profiles"
user1_profile = Profile.create(first_name: 'George', last_name: 'Kettle', bio: 'Web developer and lover of all things design', user_id: user1.id)
user2_profile = Profile.create(first_name: 'Emma', last_name: 'Lyons', bio: 'Customer service specialist and passionate yogi/pilates instructor', user_id: user2.id)
user2_profile = Profile.create(first_name: 'Ben', last_name: 'Quatermaine', bio: 'Ausmed 4 life bby', user_id: user3.id)
puts "finished creating profiles"

puts "creating task lists"
task_lists = [
  {
    name: 'Life',
    emoji: '✌🏻',
    color: '#ffb935',
    user_id: user1.id
  },
  {
    name: 'Life',
    emoji: '✌🏻',
    color: '#ffb935',
    user_id: user3.id
  },
  {
    name: 'Love',
    emoji: '💏',
    color: '#ff7b9e',
    user_id: user1.id
  },
  {
    name: 'Projects',
    emoji: '👨🏼‍💻',
    color: '#36CBF2
    ',
    user_id: user1.id
  },
  {
    name: 'University',
    emoji: '🎓',
    color: '#36CBF2',
    user_id: user2.id
  },
  {
    name: 'Fitness',
    emoji: '🏃‍♂️',
    color: '#cb75ff',
    user_id: user1.id
  },
  {
    name: 'Fitness',
    emoji: '🏃‍♂️',
    color: '#cb75ff',
    user_id: user3.id
  }
]

TaskList.create!(task_lists)
puts "finished creating task lists"

puts "creating tasks"
tasks = [
  {
    name: 'GN bevs',
    start: DateTime.now,
    end: DateTime.now,
    completed: false
  },
  {
    name: 'Pilates assignment',
    start: DateTime.now,
    end: DateTime.now,
    completed: true
  },
  {
    name: '40km cycle',
    start: DateTime.now,
    end: DateTime.now,
    completed: false
  },
  {
    name: '5km Run',
    start: DateTime.now,
    end: DateTime.now,
    completed: false
  }
]

Task.create!(tasks)

puts "finished creating tasks"

puts "creating user tasks"
user_tasks = [
  {
    task: Task.first, #'GN bevs'
    user: user1,
    task_list: user1.task_lists.second,
    task_list_position: 1,
    user_position: 1
  },
  {
    task: Task.first, #'GN bevs'
    user: user3,
    task_list: user3.task_lists.second,
    task_list_position: 1,
    user_position: 1
  },
  {
    task: Task.second, #'Pilates assignment'
    user: user2,
    task_list: user2.task_lists.second,
    task_list_position: 1,
    user_position: 1
  },
  {
    task: Task.third, #'40km cycle'
    user: user1,
    task_list: user1.task_lists.second,
    task_list_position: 2,
    user_position: 2
  },
  {
    task: Task.third, #'40km cycle'
    user: user3,
    task_list: user3.task_lists.second,
    task_list_position: 2,
    user_position: 2
  },
  {
    task: Task.last,
    user: user1,
    task_list: user1.task_lists.second,
    task_list_position: 3,
    user_position: 3
  }
]

UserTask.create!(user_tasks)
puts "finished creating user tasks"



