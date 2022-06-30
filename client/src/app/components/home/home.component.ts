import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, Query, QueryRef } from 'apollo-angular';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable, map, takeWhile , tap, of, catchError} from 'rxjs';
import { Skill } from '../../models/types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  skills!: Observable<Skill[]>;
  error: any;

  skillId: string = '';
  skillName: string = '';
  skillExperience!: number;

  postsQuery!: any;
  isEditEnabled: boolean = false;
  offset = 0;
  private _isAlive = true;

  constructor(private apollo: Apollo, public auth: AuthService, private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.postsQuery = this.apollo.watchQuery({
      query: gql `
      query GetSkills($offset: Int, $limit: Int) {
        skills(order_by: {skill_name: asc}, offset: $offset, limit: $limit) {
          skill_id
          skill_name
          exprience
        }
      }
      `,
      variables: {
        offset: 0,
        limit: 5
      }
    });

    this.skills = this.postsQuery.valueChanges
    .pipe(
      map((result:any) => {
        this.offset = result?.data?.skills?.length;
        return result?.data?.skills;
      }),
      tap(() => {
        this.refresh()
        this.spinnerService.hide();
      })
    )
  }

  onAddSkill() {
    this.spinnerService.show();
    this.apollo.mutate({
      mutation: gql `
      mutation AddSkills($skill_name: String!, $skill_experience: Float!) {
        insert_skills(objects: {skill_name: $skill_name , exprience: $skill_experience}) {
          returning {
            skill_id
            exprience
          }
        }
      }`,
      variables: {
        skill_name: this.skillName,
        skill_experience: this.skillExperience
      }
    }).pipe(
        tap(() => {
          this.spinnerService.hide();
          this.skillName = '';
          this.skillExperience = 0;
          this.refresh()
        })
      ).subscribe(({data}) => {
      console.log('got data:', data);
    }, (error) => {
      console.log(`there were error sending the query`, error)
    });
  }

  onDeleteSkill(skill_id: string) {
    this.spinnerService.show();
    this.apollo.mutate({
      mutation: gql`
      mutation DeleteSkillById($skill_id: uuid!) {
        delete_skills_by_pk(skill_id: $skill_id) {
          skill_id
          skill_name
          exprience
        }
      }`,
      variables: {
        skill_id
      }
    }).pipe(
      tap(() => {
        this.spinnerService.hide();
        this.refresh()})
      ).subscribe(({data}) => {
        console.log(`Skill deleted successfully`);
    }, (error) => {
        console.log(`Skill deletion failed`);
    })
  }

  onEditSkill(skill_id: string, skill_name: string, experience: number) {
    this.skillId = skill_id;
    this.skillName
    this.isEditEnabled = true;
  }

  onUpdateSkill() {
    this.spinnerService.show();
    this.apollo.mutate({
      mutation: gql `
      mutation UpdateSkillById($skill_id: uuid!, $skill_name: String!, $experience: Float!) {
        update_skills_by_pk(_set: {exprience: $experience, skill_name: $skill_name}, pk_columns: {skill_id: $skill_id}) {
          skill_id
          exprience
          skill_name
        }
      }
      `,
      variables: {
        skill_id: this.skillId,
        skill_name: this.skillName,
        experience: this.skillExperience
      }
    }).pipe(
      tap(() => {
        this.spinnerService.hide();
        this.refresh()})
    ).subscribe(({data}) => {

    }, (error) => {

    })
  }

  refresh() {
    this.postsQuery.refetch();
  }

  fetchMore() {
    this.postsQuery.fetchMore({
      variables: {
        offset: this.offset
      }
    })
  }

  ngOnDestroy(): void {
    this._isAlive = false;
  }
}
