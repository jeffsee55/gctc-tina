import { Dashboard } from "../../../../../components/dashboard";
import { sdk, AsyncReturnType } from "../../../../../.tina/sdk";
import { createLocalClient } from "../../../../../util/create-client";

const localSdk = sdk(createLocalClient());

export const getStaticProps = async (props) => {
  const { params } = props;
  const variables = {
    relativePath: `${params.event}-${params.category}-${params.time}.md`,
  };
  return {
    props: {
      data: await localSdk.TrainingWorkouts({
        variables,
      }),
      day: params.day,
      ...localSdk.TrainingWorkoutsString({ variables }),
    },
  };
};

export const getStaticPaths = async () => {
  const res = await localSdk.TrainingList({});
  const paths = [];
  res.getTrainingList.forEach((training) => {
    const { data } = training;
    const params = {
      event: data.event,
      category: data.category,
      time: data.time,
    };
    return data.workouts.map((workout) => {
      paths.push({ params: { ...params, day: workout.Day.toString() } });
    });
  });
  return { paths, fallback: false };
};
const Page = (props) => <Dashboard {...props} />;

export default Page;
