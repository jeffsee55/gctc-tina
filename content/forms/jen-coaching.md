---
description: >-
  ## Let's work together


  Please answer as many questions as you feel comfortable answering, the key
  here is to get to know what your goals are and where you're at today. Don't
  worry if you don't have answers for everything!
fields:
  - _template: fieldText
    label: If you have races already planned please list here
    subLabel: Include distance and date
    name: planned_races
    placeholder: "Ex. 10k - Sept 2021, 5k - Jan 2022"
  - _template: fieldText
    label: What is your biggest running goal at the present time?
    name: biggest_goal
    placeholder: Ex. Break 4 hours in the marathon
  - _template: fieldText
    label: "What is the longest race that you have competed in? "
    subLabel: Distance? When? Finish Time?
    name: longest_race
    placeholder: Ex. 1/2 Marathon - Dec 2019 (3 hrs)
  - _template: fieldText
    label: >-
      What is the most total miles you have done in a week over the past 3
      years?
    name: most_miles
    placeholder: Ex. 10
    suffix: miles
  - _template: fieldText
    label: What pace per mile do you normally run at when you do run?
    subLabel: " If you don’t know that’s ok!"
    name: pace_per_mile
    placeholder: "Ex. 9:30"
    suffix: per mile
  - _template: fieldText
    label: "Do you do other forms of cardio training? "
    subLabel: "If so, what and how often?"
    name: other_training
    placeholder: Ex. Boxing once a week
  - _template: fieldText
    label: Do you do core training?
    subLabel: "If so, how often?"
    name: core_training
    placeholder: Ex. A few minutes a day once a week
  - _template: fieldText
    label: >-
      What is the longest run that you have done in the past few years?
      Distance?
    subLabel: When was it?
    name: longest_run
    placeholder: "Ex. 10 miles, about 6 months ago"
  - _template: fieldText
    label: Do you do weight/ resistance training?
    subLabel: "If so, what and how often?"
    name: weight_training
    placeholder: Ex. Light weights every now and then
  - _template: fieldText
    label: >-
      Are you on any medication or dealing with any medical conditions that may
      impact your training and I should be aware of?
    name: medication
    placeholder: Ex. diabetes medication
  - _template: fieldText
    label: >-
      Do you have asthma, exercise induced asthma or any other breathing/
      allergy related issue?
    subLabel: "If so, please explain"
    name: breathing_allergies
    placeholder: Ex. Allergic to bees
  - _template: fieldTextarea
    label: >-
      Do you have any history of sports injuries or other injuries that I should
      be aware of that may impact your training?
    subLabel: "Please list:"
    name: injuries
  - _template: fieldTextarea
    label: "Do you follow any specific nutrition/ diet program? "
    subLabel: "As in vegetarian, paleo, low carb, high carb, low fat, gluten free, etc"
    name: diet
  - _template: fieldGroupText
    label: >-
      Please list your Personal Best times for the following distances and when
      you ran them
    subLabel: "If you don't have one, that's okay!"
    fields:
      - _template: fieldText
        name: mile
        placeholder: "Ex. 5:00, Berlin 2021"
        prefix: 1 Mile
      - _template: fieldText
        name: 10k
        prefix: 10k
      - _template: fieldText
        name: half_marathon
        prefix: 1/2 Marathon
      - _template: fieldText
        name: marathon
        prefix: Marathon
    prefix_class: w-32 justify-center text-center
  - _template: fieldCheckbox
    label: >-
      Do you have a general time of day that you normally do your exercise
      routine?
    name: preferred_time
    options:
      - label: Mornings
        value: mornings
      - label: Afternoons
        value: afternoons
      - label: Evenings
        value: evenings
  - _template: fieldWeekCheckbox
    label: >-
      Are there specific days in the week that are better for longer training
      sessions?
    name: long_runs
  - _template: fieldWeekCheckbox
    label: >-
      Are there specific days each week that you can’t run or need to take as
      days off from exercise?
    name: days_off
  - _template: fieldWeekCheckbox
    label: >-
      Are there specific days in the week that are better for interval training
      sessions
    name: track_sessions
  - _template: fieldWeekCheckbox
    label: How many days per week can you run
    name: days_per_week
  - _template: fieldBoolean
    label: Do you have a GPS or smart watch?
    subLabel: A smart watch allows us to track your effort more accurately
    name: has_gps
  - _template: fieldRadio
    label: Do you plan to do most of your running training outside or on a treadmill?
    name: terrain
    options:
      - label: Treadmill
        value: treadmill
      - label: Outside
        value: outside
_template: jenCcoaching
---
