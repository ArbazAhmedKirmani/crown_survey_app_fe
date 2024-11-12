import { useParams } from "react-router-dom";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import CSButton from "../../theme/atoms/cs-button";
import CSFormSlidingList from "../../theme/organisms/cs-form-sliding-list";
import { checkEditablePage } from "../../../utils/helper/general.helper";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import DATA from "../../../utils/constants/data.constant";
import useQueryString from "../../../hooks/use-query-string";
import { isNull } from "lodash";

const NewJob = () => {
  const param = useParams();
  const { getQuery } = useQueryString();

  const { isPending } = usePostApi({
    url: API_ROUTES.form.post,
    showSuccessMessage: true,
    onSuccess: () => {},
  });

  const selectedParent = getQuery(QUERY_STRING.OTHER_PARAMS.PARENT_FORM);

  return (
    <div className="new-job-cont">
      <div className="flex-cont">
        <div className="first-list">
          <CSFormSlidingList
            type={QUERY_STRING.OTHER_PARAMS.PARENT_FORM}
            list={DATA.job.parent}
          />
        </div>
        <div className="second-list">
          <CSFormSlidingList
            type={QUERY_STRING.OTHER_PARAMS.CHILD_FORM}
            list={
              isNull(selectedParent[QUERY_STRING.OTHER_PARAMS.PARENT_FORM])
                ? []
                : DATA.job.child.filter(
                    (x) =>
                      x.parentId ===
                      +selectedParent[QUERY_STRING.OTHER_PARAMS.PARENT_FORM]
                  )
            }
          />
        </div>
        <div className="content-section"></div>
      </div>
      <CSButton loading={isPending} type="primary">
        {checkEditablePage(param?.id, "Submit Job", "Update Job")}
      </CSButton>
    </div>
  );
};

export default NewJob;
