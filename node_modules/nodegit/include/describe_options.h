// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITDESCRIBEOPTIONS_H
#define GITDESCRIBEOPTIONS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "reference_counter.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

 
using namespace node;
using namespace v8;

class GitDescribeOptions;

struct GitDescribeOptionsTraits {
  typedef GitDescribeOptions cppClass;
  typedef git_describe_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_describe_options **dest, git_describe_options *src) {
     Nan::ThrowError("duplicate called on GitDescribeOptions which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_describe_options *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};
 class GitDescribeOptions : public NodeGitWrapper<GitDescribeOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitDescribeOptionsTraits>;
  public:
    GitDescribeOptions(git_describe_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

             
  private:
    GitDescribeOptions();
    ~GitDescribeOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetMaxCandidatesTags);
        static NAN_SETTER(SetMaxCandidatesTags);

   
        static NAN_GETTER(GetDescribeStrategy);
        static NAN_SETTER(SetDescribeStrategy);

   
        static NAN_GETTER(GetPattern);
        static NAN_SETTER(SetPattern);

   
        static NAN_GETTER(GetOnlyFollowFirstParent);
        static NAN_SETTER(SetOnlyFollowFirstParent);

   
        static NAN_GETTER(GetShowCommitOidAsFallback);
        static NAN_SETTER(SetShowCommitOidAsFallback);

  };

#endif
